const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const db = require("../models");

module.exports = function(passport){
   
    /******************************LOCAL STRATEGY**************************/
     passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {

         //Match User
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
            let hashedPass = user.dataValues.password;
            if(!user){
                return done(null, false, {message: 'No User Found'})
            }
            //Match Password
            bcrypt.compare(password, hashedPass, (err, isMatch)=>{
                if(err) throw err;
                
                if(isMatch){
                    return done(null, user)
                }else{
                    return done(null, false, {message: 'Password Incorrect'});
                }
            })
        })

    }));
    
    passport.serializeUser((user, done)=>{
        done(null, user.id)
    });
    
    passport.deserializeUser((id, done)=>{
        db.User.findOne({
            where: {
                id: id
            }
        }).then(user => done(null, user));
        //User.findById(id).then(user => done(null, user));
    });
    
}