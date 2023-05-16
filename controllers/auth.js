const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
// const passport = require('passport');

// user sign up 
const signup = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;

    User.register(new User({email: email, firstname: firstname, lastname: lastname}), password, function(err, user) { 
        // alle velden leeg
        if (email === "" || password === "" || firstname === "" || lastname === "" || password === "") {
            return res.json({
                "status": "error",
                "message": "Vul alle velden in"
            })
        // wachtwoord moet minstens 6 karakters zijn
        } else if (password.length < 6) {
            return res.json({
                "status": "error",
                "message": "Password moet langer zijn dan 6 karakters"
            })
        } 
        // nakijken of email een geldig emailadres is
        else if (!email.includes("@")) {
            return res.json({
                "status": "error",
                "message": "Vul een geldig emailadres in"
            })
        }
        if (err) {
            console.log(err);
            res.json({
                "status": "error",
                "message": "Er ging iets mis"
            })
        } else {
            // console.log(user._id);
            // webtokens
            let token = jwt.sign({
                uid: user._id,
                firstname: user.firstname,
            }, config.get('jwt.secret'))

            res.json({
                "status": "success",
                "message": "Nieuwe gebruiker aangemaakt",
                "data": {
                    "token": token
                }
            })
        }
    });  
};

// user login
const login = async (req, res) => {
    const user = await User.authenticate()(req.body.email, req.body.password).then(result => {
        // email en wachtwoord leeg
        if (req.body.email === "" || req.body.password === "") {
            return res.json({
                "status": "error",
                "message": "Vul alle velden in"
            })
        // geen gebruiker gevonden of wachtwoord onjuist
        } else if (!result.user) {
            return res.json({
                "status": "error",
                "message": "E-mail of wachtwoord is onjuist"
            })
        }

        // webtokens
        let token = jwt.sign({
            uid: result.user._id,
            firstname: result.user.firstname,
        }, config.get('jwt.secret'))

        // gebruiker gevonden en wachtwoord juist
        res.json({
            "status": "success",
            "message": "Gebruiker is ingelogd",
            "data": {
                "token": token
            }
        })
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error + error.message,
        })
    });
}

// get all users
const getAll = (req, res) => {
    User.find()
        .then(docs => {
            res.json({
                "status": "success",
                "message": "Gebruikers gevonden",
                "data": {
                    "users": docs
                }
            })
        })
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Gebruikers niet gevonden",
                "error": err
            })
        })
}

// get user by id
const getUserById = async (req, res) => {
    User.findById(req.params.id)
        .then(doc => {
            res.json({
                "status": "success",
                "message": "Gebruiker gevonden",
                "data": {
                    "user": doc
                }
            })
        })
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Gebruiker niet gevonden",
                "error": err
            })
        })
}

module.exports = {
    signup,
    login,
    getAll,
    getUserById
};