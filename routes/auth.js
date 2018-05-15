const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const path = require('path');

const db = require("../models");

router.use(express.static(path.join(__dirname, '../public')));

/************************GOOGLE AUTH ROUTES*************************/
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }), (req, res) => {
        res.redirect('/dashboard');
    });


/***********************LOCAL AUTH ROUTES*******************************/
//User Login Route
router.get('/login', (req, res) => {
    res.render('users/login');
});

//User registration Route
router.get('/register', (req, res) => {
    res.render('users/register');
});

//Login form post
router.post('/login', (req, res, next) => {
    db.User.findOne({    
          where: {
            email: req.body.email
          }
        }).then(function(user) {
            let userid = user.dataValues.id;
           if(user){
               passport.authenticate('local', {
                    successRedirect: `/dashboard`,
                    failureRedirect: '/auth/login',
                    failureFlash: 'Invalid username or password.',
                    successFlash: 'Welcome!'
                })(req, res, next);
           } 
        });
    
});



router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//Register Form Post
router.post('/register', (req, res) => {
    let errors = [];
    
    if (req.body.password != req.body.passwordConfirm) {
        errors.push({
            text: 'Passwords do not match'
        })
    }

    if (req.body.password.length < 6) {
        errors.push({
            text: 'Password must be at least 6 characters'
        });
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            businessName: req.body.businessName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            email: req.body.email,
            phoneNumber: req.body.full_phone
            
        });
    } else {
        
        db.User.findOne({    
          where: {
            email: req.body.email
          }
        }).then(function(user) {
           if(user){
                errors.push({
                    text: 'That email is already registered'
                });

                res.render('users/register', {
                    email_error: errors,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    businessName: req.body.businessName,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    email: req.body.email,
                    phoneNumber: req.body.full_phone
                });   
           } else {
                let insecurePass = req.body.password; 
               
               bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(insecurePass, salt, (err, hash) => {
                        if (err) throw err;
                        
                        let newUser = {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            businessName: req.body.businessName,
                            address: req.body.address,
                            city: req.body.city,
                            state: req.body.state,
                            zip: req.body.zip,
                            password: hash,
                            phoneNumber: req.body.full_phone,
                            isAdmin: true,
                            isManager: true
                        }
                            console.log(newUser);
                        db.User.create(newUser).then(function(user){
                            req.flash('success_msg', 'Account succesfully registered.');

                            res.redirect('/auth/login');
                        }).catch(err => {
                            console.log(err);
                            return;
                        });


                    });

                });
           }
        });

    }

});


module.exports = router;