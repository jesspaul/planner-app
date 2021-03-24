const User = require('../models/user');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

function newUser(req, res) {
    res.render('users/new', {
        title: 'Signup'
    });
}

function signUp(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS));
    User.create(req.body, function(err, newUser) {
        console.log(newUser);
        res.redirect('/');
    });
}

function signIn(req, res) {
    res.render('users/login', {
        title: 'Login'
    });
}

function login(req, res) {
    // look up the user by their username
    User.findOne({ username: req.body.username}, function(err, foundUser) {
        // if user not found, respond with message saying bad credentials
        if (!foundUser) {
            res.redirect('/users/signin');
        } else {
            // if user found, compare passwords
            const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
            if (doesPasswordMatch) {
                // if password matches, create a session using userId
                req.session.userId = foundUser._id;
                res.redirect('/weeks');
            } else {
                // if password does not match, respond with message saying bad credentials
                res.redirect('/users/signin');
            }
        }
    });
}

function dashboard(req, res) {
    if (req.session.userId) {
        res.render('users/dashboard');
    } else {
        res.redirect('/users/signin');
    }
}

function logout(req, res) {
    // delete the session
    req.session.destroy();
    // redirect to home
    res.redirect('/');
}

module.exports = {
    new: newUser, 
    signUp,
    signIn,
    login,
    dashboard,
    logout
};