//Dependencies
const express = require('express');
const router = express.Router();
const path = require("path");
const db = require("../models");
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

router.use(express.static(path.join(__dirname, '../public')));

//Employee route
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('settings/settings');
});


module.exports = router;