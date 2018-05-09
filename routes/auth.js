const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


/***********************LOCAL AUTH ROUTES*******************************/
//User Login Route
router.get('/login', (req, res) => {
    res.render('users/login');
});

//User registration Route
router.get('/register', (req, res) => {
    res.render('users/register');
});

module.exports = router;