const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
          title : 'user/profile',
    });
}

//render the sign up and signin page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "codeial | Sign Up"
    });
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: "codeial | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    //if password and confirm password is different
    if(req.body.password!=req.body.confirm_password){
        console.log('check the confirm password');
        return res.redirect('back');
    }
    //if user alredy there and if not there
    User.findOne({email: req.body.email},function(err, user){
        if(err){console.log('error in finding user in sign up'); return}
        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while  sign up'); return}
                console.log('signed up successfully'); 
                return  res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}


//get the sign in and create a session for the user by usin passport.js
module.exports.createSession = function(req,res){
    //TODO later
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}
