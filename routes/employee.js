//Dependencies
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {
    ensureAuthenticated,
    ensureGuest
} = require('../helpers/auth');

const path = require("path");
const db = require("../models");

router.use(express.static(path.join(__dirname, '../public')));
/***********************LOCAL EMPLOYEE ROUTES*******************************/
//Employee routes
router.get('/view', ensureAuthenticated, (req, res) => {
    //sequlizer for find all users to display
    db.User.findAll({}).then(function (dbUser) {
        let foundUsers = dbUser[0].dataValues;
        res.render('employee/view', {users: foundUsers});
    });
});
//render view handlebar




router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('employee/employee');
});
//post route for adding new employees
router.post('/add', (req, res) => {
    
    let insecurePass = req.body.password;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(insecurePass, salt, (err, hash) => {
            if (err) throw err;

            let newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                phoneNumber: req.body.phoneNumber,
                hourlyPay: req.body.hourlyPay,
                isManager: req.body.isManager,
                department: req.body.department
            }

                db.User.create(newUser).then(function (user) {
                    req.flash('success_msg', 'Account succesfully registered.');

                    res.redirect('/dashboard');
                }).catch(err => {
                    console.log(err);
                    return;
                });
            });
        });
    });
});


module.exports = router;