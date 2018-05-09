const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const mysql2 = require("mysql2");
const passPort = require("passport");
const cookieParser = require("cookie-parser");
const sequelize = require("sequelize");
const session = require("express-session");
const passport = require("passport");

const app = express();
const db = require("./models");


/**********************LOAD ROUTES***********************/
const index = require('./routes/index');


/******************-MIDDLE WARE***********************/
//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Method Override middleware
app.use(methodOverride('_method'));

app.use(cookieParser());

//Express-Session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


// Static directory
app.use(express.static("public"));


/**********************USE ROUTES**************************/
app.use('/', index);



const PORT = process.env.port || 8080;

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});