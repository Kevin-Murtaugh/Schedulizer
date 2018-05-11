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
        let foundUsers = [];
        dbUser.forEach(user => {
            let viewUser = {
                'id': user.id,
                'firstName': user.firstName,
                'lastName': user.lastName,
                'email': user.email,
                //when edit button is working this will work. The value of phoneNUmber, department, and hourlyPay is null right now, when their not it will display correctly
                'phoneNumber': user.phoneNumber,
                'department': user.department,
                'hourlyPay': user.hourlyPay
            }
            // console.log(viewUser);
            foundUsers.push(viewUser);
        });
        res.render('employee/view', {
            users: foundUsers
        });
    });
});
//render view handlebar

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    db.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (dbUser) {
       let userInfo = [];
        let user = {
            'id': dbUser.dataValues.id,
            'firstName': dbUser.dataValues.firstName,
            'lastName': dbUser.dataValues.lastName,
            'email': dbUser.dataValues.email,
            'phoneNumber': dbUser.dataValues.phoneNumber,
            'department': dbUser.dataValues.department,
            'hourlyPay': dbUser.dataValues.hourlyPay,
            'department': dbUser.dataValues.department
        }
        userInfo.push(user);
        //console.log(user);
        res.render('employee/employee_edit' , {
            userProfile: user
        });
    });
});
//PUT method does not work, trying to get the values in mySQL to uodate when update button clicked
router.put('/edit/:id' , ensureAuthenticated , (req, res) => {

    let userId = req.params.id;

    db.User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        phoneNumber: req.body.phoneNumber,
        hourlyPay: req.body.hourlyPay,
        isManager: req.body.isManager,
        department: req.body.department
    }, {
        where: {
            id : userId
        }
    }).then(function(dbUser){
      // res.render('/index/dashboard');
    });
});

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


module.exports = router;