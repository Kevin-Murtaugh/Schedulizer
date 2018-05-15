const express = require('express');
const router = express.Router();
const path = require("path");
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const nodeMailer = require("nodemailer");
const moment = require('moment');
const db = require("../models");


router.get('/', (req, res) => {
    let scheduledUsers = [];
    db.Event.findAll({}).then(function(eventUser) {
        eventUser.forEach(user => {
            let userStart = user.start.split(" ");
            let userEnd = user.end.split(" ");
            var start = moment(userStart[1], "HH:mm");
            var end = moment(userEnd[1], "HH:mm");
            var duration = moment.duration(end.diff(start));
            var hours = parseInt(duration.asHours());
            let userReport = {
                'id': user.userId,
                'name': user.Name,
                'userHours': hours
            }
            scheduledUsers.push(userReport);
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