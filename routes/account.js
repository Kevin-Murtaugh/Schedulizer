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

router.get('/:id', ensureAuthenticated, (req, res)=>{
        
    db.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        let foundUser = user.dataValues;

        if(foundUser.password === null && foundUser.phoneNumber === null ){
            foundUser.password = '';
            foundUser.phoneNumber = '';
            foundUser.hourlyPay = '';
        }
        res.render('account/profile', foundUser); 
    })
   
});

module.exports = router;