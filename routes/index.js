const express = require('express');
const router = express.Router();
const path = require("path");
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
router.use(express.static(path.join(__dirname, '../public')));
const db = require("../models");
const nodeMailer = require("nodemailer");
//Main Route
router.get('/', ensureGuest, (req, res)=>{
   res.render('index/welcome'); 
});


router.post("/", (req, res) => {
    console.log(req.body);
    var userEmail = req.body.newsLetterEmail;
    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'SchedulizerMail@gmail.com',
        pass: 'Default123'
        }
    });
    
    
    var mailOptions = {
        from: 'Schedulizer <SchedulizerMail@gmail.com>',
        to: userEmail,
        subject: 'Welcome to Schedulizer!',
        text: 'Thank you for registering to the Schedulizer news letter! All updates and changes for the website will now be sent to you as well as any features or services added! \n \n \n -Schedulizer Team'
    }
    
    
    transporter.sendMail(mailOptions, function(err, res) {
        if(err) {
            console.log("Error");
        } else {
            console.log("Email Sent");
        }
    });

    let newsLetterEmail = db.newsLetter.create({
        email: req.body.newsLetterEmail
    }).then(function(userEmail) {
        //console.log(userEmail);
    });

    /******** Code below will be used to send message to all news letter users *********/
    let newsLetterUsers = db.newsLetter.findAll({
        attributes: ['email']
    }).then(function(users) {
        // looping over database and grabbing email info for registered news letter users.
        users.forEach(user => {
            // console.log(user.dataValues.email);
        });
    });
});


module.exports = router;