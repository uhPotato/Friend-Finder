// first set up the dependencies
var express = require("express");
var bodyParser = require('body-parser')
var path = require('path');

// Tell node we're creating an express server
var app = express();

// set port to 8080 or whatever heroku (deployment site) sets it to
var PORT = process.env.PORT || 8080;

// express middleware needed for serving static files. For more details
// see here: http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/app/public'));

// set up BodyParser to make it possible to interpret data sent to our server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));


// bring in api routes - bring in api routes first because
// that's where we're getting our data to display in html pages
require("./app/routing/api_routes.js")(app);

// bring in the html routes
require("./app/routing/html_routes.js")(app);

// set up the listener
app.listen(PORT, function() {
	console.log("app listening on port", PORT);
});