const express = require('express');
const router = express.Router();
const path = require("path");
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const socketio = require('socket.io');
const _ = require('lodash');
const keys = require('../config/keys');
const nodeMailer = require("nodemailer");
const twilio = require('twilio');
const moment = require('moment');


const db = require("../models");

router.use(express.static(path.join(__dirname, '../public')));

/*******************DASHBOARD GET ROUTES***********************/
router.get("/", ensureAuthenticated, function(req, res) {
    
    res.render("index/dashboard");
});

router.get('/shifts.json', (req, res)=>{
    db.Event.findAll({}).then(function(eventData) {
        
        let eventDataArray = eventData.map(data => data.dataValues);

        res.json(eventDataArray);
    });
});


router.get('/schedules.json', (req, res)=>{
    db.Schedule.findAll({}).then(function(scheduleData) {
        
        let scheduleDataArray = scheduleData.map(data => data.dataValues);

        res.json(scheduleDataArray);
    });
});

router.get('/add-shift/:date', ensureAuthenticated, function(req,res) {
    let date = req.params.date;

    db.User.findAll({}).then(function(userData) {

        let users = userData.map(user => {
            // console.log(user.firstName + " " + user.lastName);
                return {
                    userName: user.firstName + " " + user.lastName,
                    userID: user.id,
                    department: user.department
                }
        }).filter(elem => {
            return elem !== undefined;
        });

        res.render("shifts/add-shift", {
            users: users,
            date: date
        });
    });
});

/*******************DASHBOARD POST ROUTES***********************/
router.post('/', (req, res)=>{
    //Save schedule with status of published and up all events within that schedule to the status of published
    db.Schedule.create(req.body).then(savedSchedule => {
        //FIND ALL EVENTS TO SEND OUT TEXT MESSAGE
        db.Event.findAll({
            where:{
                shiftStatus: 'draft'
            }
        }).then(foundEvents =>{
            
            let foundEventsArray = foundEvents.map(data => data.dataValues);
                
            let employeeShifts = _.mapValues(_.groupBy(foundEventsArray, 'title'),
                elist => elist.map(employee => _.omit(employee, ['title', 'id', 'department', 'url', 'className', 'overlap', 'color', 'shiftStatus'])));
                let scheduleLength = Object.keys(employeeShifts).length;

                var x;
            
                for (x in employeeShifts) {
                    
                    let employeeID = employeeShifts[x][0].userId;
                    let shiftArray = employeeShifts[x];
                    let shiftMessagesArray = shiftArray.map(shift =>{
                        let shiftStart = moment(new Date(shift.start)).format("ddd MMM, Do hh:mm a");
                        let shiftEnd = moment(new Date(shift.end)).format("hh:mm a");
                        let message = `${shiftStart} -  ${shiftEnd},\n`;
                        return message;
                    });
                    
                    let initialSalutation = `ManagerComments: ${req.body.managerComments} Sheduled Shifts:\n`;
                    shiftMessagesArray.unshift(initialSalutation);
                    let finalMessage = shiftMessagesArray.join(' ');
                    
                    db.User.findOne({
                        where: {
                            id: employeeID
                        }
                    }).then(foundEmployee => {

                        let phoneNumber = foundEmployee.dataValues.phoneNumber;

                        const client = new twilio(keys.twilio.accountSID, keys.twilio.authToken);

                            client.messages.create({
                                body: finalMessage,
                                to: phoneNumber,  // Text this number
                                from: '+14079882078' // From a valid Twilio number
                            })
                            .then((message) => console.log(message));
                           

                    }).catch(err => {
                        console.log(err);
                    });
                    
                }

        }).catch(err =>{
            console.log(err);
            return;
        });
        
        //UPDATE ALL EVENTS TO PUBLISHED STATUS
        db.Event.update({
            shiftStatus: req.body.scheduleStatus
        }, {
            where: {
                shiftStatus: 'draft'
            }
        }).then(function (updatedEventStatus){
            res.json({
                managerComments: req.body.managerComments
            })
        }).catch(err =>{
            console.log(err);
            return;
        });
 
    }).catch(err => {
        console.log(err);
        return;
    });
    

});


router.post('/add-shift/:date', ensureAuthenticated, function(req, res) {
    let color,
        htmlClass;
    
    
    
    db.User.findOne({    
          where: {
            id: req.body.userId
          }
        }).then(function(user) {
            console.log(user);
            let title = `${user.dataValues.firstName} ${user.dataValues.lastName}`;
            
            if(user.dataValues.department === 'FOH'){
                color = '#f7992e';
                htmlClass = 'FOHDraftShift';
            }else{
                color = '#2e7bf7';
                htmlClass = 'BOHDraftShift';
            }
        
            let newEvent = {
                title: title,
                department: user.dataValues.department,
                start: `${req.params.date} ${req.body.shiftStart}`,
                end: `${req.params.date} ${req.body.shiftEnd}`,
                overlap: true,
                className: htmlClass,
                color: color,
                userId: req.body.userId
            }
            
                 db.Event.create(newEvent).then(function (savedEvent) {
                    //req.flash('success_msg', 'Account succesfully registered.');

                    res.redirect('/dashboard');
                }).catch(err => {
                    console.log(err);
                    return;
                });
        });

});

router.post("/dashboard", (req, res) => {
    console.log(req.body);
    let adminMessage = req.body.subject;
      /******** Code below will be used to send message to all news letter users *********/
      let newsLetterUsers = db.newsLetter.findAll({
        attributes: ['email']
    }).then(function(users) {
        // looping over database and grabbing email info for registered news letter users.
        users.forEach(user => {
            // console.log(user.dataValues.email);
            let allSubscribers = user.dataValues.email;
            var transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'SchedulizerMail@gmail.com',
                pass: 'Default123'
                }
            });
            
            var mailOptions = {
                from: 'Schedulizer <SchedulizerMail@gmail.com>',
                to: allSubscribers,
                subject: 'Update from Schedulizer',
                text: adminMessage
            }
            
            
            transporter.sendMail(mailOptions, function(err, res) {
                if(err) {
                    console.log("Error");
                } else {
                    console.log("Email Sent");
                }
            });
        });
    });

    res.redirect("/dashboard");
});

module.exports = router;
