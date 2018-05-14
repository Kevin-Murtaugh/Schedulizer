const express = require('express');
const router = express.Router();
const path = require("path");
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const nodeMailer = require("nodemailer");
const db = require("../models");

router.get('/', (req, res) => {
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