const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
<<<<<<< HEAD
    res.render('_footer/view',{});
=======
    res.render('footer/view',{});
>>>>>>> b558a5053a80b74e090f4d270c6ca9edb48578a4
});


module.exports = router;