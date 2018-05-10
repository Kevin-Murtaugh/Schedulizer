const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const db = require("../models");


router.get("/dashboard", function(req, res) {
    res.render("index/dashboard");
});


