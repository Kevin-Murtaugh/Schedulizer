const express = require('express');
const router = express.Router();
const path = require("path");
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const db = require("../models");

router.use(express.static(path.join(__dirname, '../public')));

router.get("/",  function(req, res) {
    res.render("index/dashboard");
});


router.get('/add-shift/:date', function(req,res) {
    let date = req.params.date;
    let department = req.query.department;
    // console.log(department);
    // console.log(date);

    db.User.findAll({department: department}).then(function(userData) {
        // console.log(userData[0].dataValues);
        res.render("shifts/add-shift");
    });
});

router.post('/add-shift', function(req, res) {
    res.json(req.body);
});

module.exports = router;
