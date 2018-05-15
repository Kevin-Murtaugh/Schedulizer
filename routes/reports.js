const express = require('express');
const router = express.Router();
const path = require("path");
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const nodeMailer = require("nodemailer");
const moment = require('moment');
const db = require("../models");


router.get('/', ensureAuthenticated, (req, res) => {
    let scheduledUsers = [];
    db.Event.findAll({}).then(function(eventUser) {
        eventUser.forEach(user => {
            let userStart = user.start.split(" ");
            let userEnd = user.end.split(" ");
            let start = moment(userStart[1], "HH:mm");
            let end = moment(userEnd[1], "HH:mm");
            let duration = moment.duration(end.diff(start));
            let userHours = parseInt(duration.asHours());
            let totalHours = 0;
            if(user.userId) {
                totalHours += userHours
                let userReport = {
                    'id': user.userId,
                    'name': user.title,
                    'userHours': totalHours
                } 
            } 
        });
        console.log(scheduledUsers);
    });

    db.User.findAll({}).then(function (dbUser) {
        let allUsers = [];
        dbUser.forEach(user => {
            let reportsUser = {
                'id': user.id,
                'Name': user.firstName + " " + user.lastName,
                'scheduledHrs': "Coming soon",
                'payRate': user.hourlyPay,
                'estimateTotalPay': 'Coming soon'
            }
            // console.log(viewUser);
            allUsers.push(reportsUser);
        });

        res.render('reports/reports', {
            users: allUsers
        });
    });
});




module.exports = router;