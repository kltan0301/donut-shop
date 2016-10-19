var express = require('express')
var app = express()
var port = 4000;
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var dotenv = require('dotenv')

//set up db
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

dotenv.load({ path: '.env.' + process.env.NODE_ENV});
mongoose.connect(process.env.MONGO_URI)
// if(process.env.NODE_ENV === 'production'){
//   mongoose.connect('mongodb://kltan:password@ds035653.mlab.com:35653/wdi6');
// }else{
//   mongoose.connect('mongodb://localhost/donutShop');
// }

//set up routes
var donutRoutes = require('./routes/donuts');
var donutAPIRoutes = require('./routes/donuts_api');
var userRoutes = require('./routes/users');
var userAPIRoutes = require('./routes/users_api');

//set up views
app.set('view engine', 'ejs');
app.use(expressLayouts);

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
