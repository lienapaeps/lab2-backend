const User = require('../models/user');
const passport = require('passport');

// user sign up 
const signup = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // let firstname = req.body.firstname;
    // let lastname = req.body.lastname;

    const user = new User({username: email});
    await user.setPassword(password);
    await user.save().then(result => {
        res.json({
            "status": "success",
            "message": "User created",
        })
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        })
    });
};

// user login
const login = async (req, res) => {
    const user = await User.authenticate()(req.body.email, req.body.password).then(result => {
        // no user found
        if (!result.user) {
            return res.json({
                "status": "error",
                "message": "Invalid email or password"
            })
        }

        res.json({
            "status": "success",
            "message": "User logged in",
        })
    }).catch(error => {
        res.json({
            "status": "error",
            "message": "Invalid email or password"
        })
    });
}

// changePassword

module.exports = {
    signup,
    login
};