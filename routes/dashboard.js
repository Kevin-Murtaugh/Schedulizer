const express = require('express');
const router = express.Router();
const path = require("path");
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const db = require("../models");

router.use(express.static(path.join(__dirname, '../public')));

router.get("/", ensureAuthenticated, function(req, res) {
    
    res.render("index/dashboard");
});

router.get('/shifts.json', (req, res)=>{
    db.Event.findAll({}).then(function(eventData) {
        
        let eventDataArray = eventData.map(data => data.dataValues);

        res.json(eventDataArray);
    });
});


router.get('/add-shift/:date', ensureAuthenticated, function(req,res) {
    let date = req.params.date;
    let department = req.query.department;

    db.User.findAll({
            department: department
    }).then(function(userData) {
        let users = userData.map(user => {
            // console.log(user.firstName + " " + user.lastName);
            if(user.department === department) {
                return {
                    userName: user.firstName + " " + user.lastName,
                    userID: user.id
                }
            }
        }).filter(elem => {
            return elem !== undefined;
        });


        res.render("shifts/add-shift", {
            users: users,
            date: date,
            department: department
        });
    });
});

router.post('/add-shift/:date', ensureAuthenticated, function(req, res) {
    let color,
        htmlClass;
    
    if(req.query.department === 'FOH'){
        color = '#f7992e';
        htmlClass = 'FOHShift';
    }else{
        color = '#2e7bf7';
        htmlClass = 'FOHShift';
    }
    
    db.User.findOne({    
          where: {
            id: req.body.userId
          }
        }).then(function(user) {
            let title = `${user.dataValues.firstName} ${user.dataValues.lastName}`;
        
            let newEvent = {
                title: title,
                department: req.query.department,
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

module.exports = router;
