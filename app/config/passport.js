var TwitterStrategy = require('passport-twitter').Strategy,
    User = require('../models/users'),
    passport = require('passport');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new TwitterStrategy({
            consumerKey: process.env.Twitter_api_key,
            consumerSecret: process.env.Twitter_api_secret,
            callbackURL: process.env.ROOT_URL + "auth/twitter/callback"
        },
        function(token, tokenSecret, profile, done) {
            User.findOne({ username: profile.username }, function(err, user) {
                if (err)
                    return done(err);
                else if (user)
                    return done(null, user);
                else {
                    var newUser = new User();
                    newUser.username = profile.username;
                    newUser.displayName = profile.displayName;
                    newUser.save(function(err) {
                        if (err)
                            return done(err);
                        return done(null, newUser);
                    });
                }
            });
        }
    ));
};
