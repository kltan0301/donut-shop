var express = require('express')
var app = express()
var port = 4000;
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var dotenv = require('dotenv')
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

//set up db
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

dotenv.load({ path: '.env.' + process.env.NODE_ENV});
mongoose.connect(process.env.MONGO_URI)

//set up routes
var donutRoutes = require('./routes/donuts');
var donutAPIRoutes = require('./routes/donuts_api');
var userRoutes = require('./routes/users');
var userAPIRoutes = require('./routes/users_api');

//set up views
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
//serve static files
app.use(express.static(__dirname + '/public'))
//set up body parser
//parse json request
app.use(bodyParser.json());
//parse form submitted data
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/donuts', donutRoutes)
app.use('/api/donuts', donutAPIRoutes);
app.use('/users', userRoutes);
app.use('/api/users', userAPIRoutes);
app.listen(process.env.PORT || port);
console.log("server running on: " + port)
