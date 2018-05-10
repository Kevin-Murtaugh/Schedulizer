const express = require('express');
const router = express.Router();
const path = require("path");
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const db = require("../models");
router.use(express.static(path.join(__dirname, '../public')));

router.get("/", ensureAuthenticated, function(req, res) {
    res.render("index/dashboard");
});

router.get('/add-shift', function(req,res) {
    res.render("shifts/add-shift");
});

module.exports = router;
