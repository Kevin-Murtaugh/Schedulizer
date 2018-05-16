const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const keys = require('./keys');
const {google} = require('googleapis');


const db = require("../models");

module.exports = function(passport){
    /*****************************GOOGLE STRATEGY******************/
    passport.use(
        new GoogleStrategy({
            clientID: keys.google.googleClientID,
            clientSecret: keys.google.googleClientSecret,
            callbackURL: "/auth/google/callback",
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
            proxy: true
        }, 
        (accessToken, refreshToken, profile, done)=>{
            const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
            const newUser = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: image
            }
            
            //Check for existing user
            db.User.findOne({
                where: {
                    email: newUser.email    
                }
            }).then(user => {
                if(user){
                    //return user
                   done(null, user);
                }else{
                   //Create user
                    db.User.create(newUser).then(function(user){
                        done(null, user);
                    }).catch(err => {
                        console.log(err);
                        return;
                    });
                }
            })
        })
    );

   
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

    });
    
}