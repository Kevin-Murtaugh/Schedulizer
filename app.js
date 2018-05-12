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
const flash = require('connect-flash');

const app = express();



/******************LOAD MODELS*************************/
const db = require("./models");

//Passport Config
require('./config/passport')(passport);


/**********************LOAD ROUTES***********************/
const index = require('./routes/index');
const auth = require('./routes/auth');
const employee = require('./routes/employee');
const dashboard = require("./routes/dashboard");
const settings = require("./routes/settings");

const features = require("./routes/features");
const pricing = require("./routes/pricing");

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

app.use(flash());

//Set Global vars
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


// Static directory
app.use(express.static(__dirname + '/public'));


/**********************USE ROUTES**************************/
app.use('/', index);
app.use('/auth', auth);
app.use('/employee' , employee);
app.use('/dashboard', dashboard);
app.use('/settings', settings);

app.use('/features', features);
app.use('/pricing', pricing);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


const PORT = process.env.port || 8080;

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});