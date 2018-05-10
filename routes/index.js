const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

//Main Route
router.get('/', ensureGuest, (req, res)=>{
   res.render('index/welcome'); 
});

module.exports = router;