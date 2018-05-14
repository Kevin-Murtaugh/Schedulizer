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
    db.User.findAll({
        where: {
            isAdmin: false
        }
    }).then(function (dbUser) {
        let foundUsers = [];
        dbUser.forEach(user => {
            let viewUser = {
                'id': user.id,
                'firstName': user.firstName,
                'lastName': user.lastName,
                'email': user.email,
                'phoneNumber': user.full_phone,
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

router.get('/add/:id', ensureAuthenticated, (req, res) => {
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
            'phoneNumber': dbUser.dataValues.full_phone,
            'department': dbUser.dataValues.department,
            'hourlyPay': dbUser.dataValues.hourlyPay,
            'department': dbUser.dataValues.department
        }
        userInfo.push(user);
        //console.log(user);
        res.render('employee/employee_edit', {
            userProfile: user
        });
    });
});

//PUT method does not work, trying to get the values in mySQL to uodate when update button clicked
router.put('/add/:id', (req, res) => {
    
    db.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (dbUser) {
        let hashedPassword;
        if(req.body.password === ''){
            hashedPassword = dbUser.dataValues.password;
            
                db.User.update({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: hashedPassword,
                    email: req.body.email,
                    phoneNumber: req.body.full_phone,
                    hourlyPay: req.body.hourlyPay,
                    isManager: req.body.isManager,
                    department: req.body.department
                }).then(function (update){
                    res.redirect('/employee/view');
                });
            
        }else {
            
            let insecurePass = req.body.password;
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(insecurePass, salt, (err, hash) => {
                    if (err) throw err;
                    
                    db.User.update({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        password: hash,
                        email: req.body.email,
                        phoneNumber: req.body.full_phone,
                        hourlyPay: req.body.hourlyPay,
                        isManager: req.body.isManager,
                        department: req.body.department
                    }).then(function (update){
                        res.redirect('/employee/view');
                    });
                    
                });
            });
        }

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
                phoneNumber: req.body.full_phone,
                hourlyPay: req.body.hourlyPay,
                isManager: req.body.isManager,
                department: req.body.department
            }
            db.User.create(newUser).then(function (user) {
                req.flash('success_msg', 'Account succesfully registered.');

                res.redirect('/employee/view');
            }).catch(err => {
                console.log(err);
                return;
            });
        });
    });
});
//delete method to remove users from DB
router.delete('/add/:id', function(req, res){
    console.log("destroy method");
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
        res.redirect("/employee/view");
    });
  });
module.exports = router;