const express = require("express");
const bodyParser = require("body-parser");
const expbhs = require("express-handlebars");
const methodOverride = require("method-override");
const mysql2 = require("mysql2");
const passPort = require("passport");
const cookieParser = require("cookie-parser");
const sequelize = require("sequelize");
const expressSession = require("express-session");

const app = express();

const PORT = process.env.port || 8080;

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});