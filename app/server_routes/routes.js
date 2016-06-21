var serverRender = require("../utils/serverRendering");
var pinHandler = require("../utils/pinHandler");
var path = require('path');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================

    app.get('/getUser', LoggedInAjax, function(req, res) {
        res.json(req.user);
    });

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/'
        }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/getallpins', function(req, res) {
        pinHandler.getAllPins(req, res);
    });

    app.get('/getmypins', LoggedInAjax, function(req, res) {
        pinHandler.getMyPins(req, res);
    });

    app.post('/deletepin', LoggedInAjax, function(req, res) {
        pinHandler.deletePin(req, res);
    });

    app.post('/addpin', LoggedInAjax, function(req, res) {
        pinHandler.addPin(req, res);
    });

    app.get('/getuserpins/:username', function(req, res) {
        pinHandler.getUserPins(req, res);
    });

    app.get(['/my', '/add'], isLoggedIn, function(req, res) {
        res.sendFile(path.join(__dirname, '../../public/index2.html'));
    });

    app.get('/*', function(req, res) {
        // serverRender.handleRender(req, res);
        res.sendFile(path.join(__dirname, '../../public/index2.html'));
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/auth/twitter');
}

function LoggedInAjax(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.json({ redirect: "/auth/twitter" });
}
