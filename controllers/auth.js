const User = require('../models/user');
const passport = require('passport');

// user sign up 
const signup = async (req, res) => {
    console.log(req.body);

    //momenteel testen via postman
    let username = req.body.username;
    let password = req.body.password;

    const user = new User({username: username});
    await user.setPassword(password);
    await user.save().then(result => {
        res.json({
            "status": "success"
        })
    }).catch(error => {
        res.json({
            "status": "error"
        })
    });
};

// user login
const login = async (req, res) => {
    console.log(req.body);

    //momenteel testen via postman
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
        res.json({
            "status": "success",
            "data": {
                "user": result
            }
        })
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        })
    });
};

// changePassword

module.exports = {
    signup,
    login
};