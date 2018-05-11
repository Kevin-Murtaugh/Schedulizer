//Dependencies
const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../models");
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

router.use(express.static(path.join(__dirname, '../public')));

//Employee route
router.get('/', (req, res) => {
    res.render('settings/settings');
});

router.post('/', (req, res)=>{
    
    let newSettings = {
        UserId: parseInt(req.body.id),
        columnHeaderFormat: req.body.columnHeaderFormat,
        slotDuration: req.body.slotDuration,
        firstDate: req.body.firstDate,
        minTime: req.body.minTime,
        maxTime: req.body.maxTime,
        notificationEmail: req.body.notificationEmail,
        emailName: req.body.emailName
    }
    
    db.Settings.create(newSettings).then(function(managerSettings) {
        res.redirect('/');
    });
    
    
});


module.exports = router;