const passport = require("passport")

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
},

//done is a call back function which is used toreport to the passport.js
function(emai, password, done){
//find a user and establish the identity
User.findOne({email: emai}, function(err, user){
    if(err){
        console.log('Error in finding the user ----> passsport');
        return done(err);
    }
    if(!user || user.password != password){
        console.log('invalid username/password');
        return done(null, false);
    }

    return done(null, user);
});
}));

// serializeUser determines which data of the user object should be   
// stored in the session. The result of the serializeUser method is 
// attached to the session as req.session.passport.user = {} . Here for 
// instance, it would be (as we provide the user id as the key) req.session.passport.user = {id: 'xyz'}

passport.serializeUser(function(user, done){
    done(null,user.id);
});

//deserializing the user from the key in the cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding the user ----> passsport');
            return done(err);
        }

        return done(null, user);
    });
});

//check if the user is authenticated it is a middleware
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        //if the user is signed in, then pass on the request to the next function that is controller's action
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the local for viewss
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;