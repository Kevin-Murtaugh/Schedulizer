const express = require('express');
const router = express.Router();
const path = require("path");
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
router.use(express.static(path.join(__dirname, '../public')));

//Main Route
router.get('/', ensureGuest, (req, res)=>{
   res.render('index/welcome'); 
});

module.exports = router;