const express = require('express');
const router = express.Router();
const path = require("path");
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
router.use(express.static(path.join(__dirname, '../public')));
const db = require("../models");
//Main Route
router.get('/', ensureGuest, (req, res)=>{
   res.render('index/welcome'); 
});


router.post("/", (req, res) => {
    console.log(req.body);
    db.newsLetter.create({
        email: req.body.newsLetterEmail
      }).then(function(userData) {
        // We have access to the new user email as an argument inside of the callback function
        res.json(userData);
      });
});

module.exports = router;