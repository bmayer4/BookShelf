const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('./../config/keys');
const _ = require('lodash');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstName: {
        type: String,
        maxlength: 100
    },
    lastName: {
        type: String,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
});


//we are overriding toJSON, determines what gets send back when a mongoose model is converted into json 
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
  
    return _.pick(userObject, ['_id', 'email', 'password', 'firstName', 'lastName', 'role']);
};

userSchema.methods.comparePassword = function(password) {
    let user = this;
 
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) { return Promise.reject(); }
            isMatch ? resolve(user) : reject();
        });
    });
}

userSchema.methods.generateToken = function() {
    let user = this;
    let token = jwt.sign({ _id: user._id }, keys.secret).toString();
    user.token = token;
    return user.save().then(() => {
        return token;
    });
}

userSchema.methods.removeToken = function(token) {
    let user = this;
    return user.update({ $unset: { token: token }});  
};

userSchema.statics.findByToken = function(token) {
    let User = this;
    let decoded;  
    try {
        decoded = jwt.verify(token, keys.secret);
    } catch (e) {
        return Promise.reject();
    }
    
    return User.findOne({ _id: decoded._id, token: token });
}

userSchema.pre('save', function(next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) { return next(err)}
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) { return next(err)}
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User }

