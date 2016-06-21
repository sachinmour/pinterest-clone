require('babel-core/register');
var path = require('path');
require("dotenv").config();
var express = require('express'),
    server_routes = require("./app/server_routes/routes"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    flash = require("connect-flash"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    session = require("express-session");
var app = express();
mongoose.connect(process.env.MONGODB_URI);
require('./app/config/passport')(passport);
var PORT = process.env.PORT || 8080;
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ // get information from html forms    
    extended: true //
}));
// required for passport
app.use(session({
    secret: 'somethingsecretivetostore',
    saveUninitialized: true,
    resave: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
// using webpack-dev-server and middleware in development environment
if (process.env.NODE_ENV !== 'production') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var config = require('./webpack.config.js');
    var compiler = webpack(config);
    var morgan = require('morgan');
    app.use(morgan('dev'));
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
}
app.use(express.static(path.join(__dirname, '/public')));
server_routes(app, passport);
app.listen(PORT, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    }
});
