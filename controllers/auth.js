const User = require('../models/user');
// const passport = require('passport');

// user sign up 
const signup = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;

    User.register(new User({email: email, firstname: firstname, lastname: lastname}), password, function(err, user) {  
        if (err) {
            console.log(err);
            res.json({
                "status": "error",
                "message": "Er ging iets mis"
            })
        } else {
            res.json({
                "status": "success",
                "message": "User created",
            })
        }
    });    

    // const user = new User({email: email});
    // user.firstname = firstname;
    // user.lastname = lastname;
    // user.setPassword(password);
    // await user.save().then(result => {
    //     res.json({
    //         "status": "success",
    //         "message": "User created",
    //     })
    // }).catch(error => {
    //     res.json({
    //         "status": "error",
    //         "message": "Er ging iets mis"
    //     })
    // });
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

        // user found
        res.json({
            "status": "success",
            "message": "User logged in",
        })
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        })
    });
}

// changePassword

module.exports = {
    signup,
    login
};