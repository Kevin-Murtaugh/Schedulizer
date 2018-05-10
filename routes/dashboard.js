const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const db = require("../models");


router.get("/", ensureAuthenticated, function(req, res) {
    res.render("index/dashboard");
});



module.exports = router;
