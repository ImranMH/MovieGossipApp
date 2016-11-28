var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;
//var ejs = require('ejs');
var mongoose = require('mongoose');
//var connectingString ='mongodb://127.0.0.1:27017/test-chirp'
var connectingString = 'mongodb://movieGossip:imran2020@ds139817.mlab.com:39817/movie-gassip' ;

if (process.env.PORT) {
	var connectingString = 'mongodb://movieGossip:imran2020@ds139817.mlab.com:39817/movie-gassip' ;
}
//var connectingString = 'mongodb://imran:2020@ds139817.mlab.com:39817/movie-gassip';
var options = {
  server: { poolSize: 1 }
}		
 mongoose.connect(connectingString, options)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('database connected!!!!');
});


app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    resave: false,
    saveUninitialized: true,
	secret:'my secret'
}))
// ejs setup
app.set('view engine', 'ejs')
app.set('views', __dirname +'/ejs');
app.use('/lib', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname +'/public'))
//console.log(app.locals.ul);

//app.locals.user = {}

var apis = require('./route/apis')
var movie = require('./route/movie')
var production = require('./route/production.route')

var users = require('./route/users');
//console.log(milist);
app.use( function(req, res,next) {

   res.locals.user = req.session.user || {};
   next()
})
app.get('/', function(req, res) {
	res.render('index')
})



	app.use('/user', users)
	app.use('/production', production)
	app.use('/movie', movie)
	app.listen(port, function() {

  console.log('server running at port: ....');
})