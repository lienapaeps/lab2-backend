const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({});

// adds username and password to the schema
// and adds methods to the model like register, authenticate, serializeUser, deserializeUser
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);