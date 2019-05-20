const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

let user_schema = new mongoose.Schema({
    staff_name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not valid email"
        }
    },
    staff_active: {
        type: Boolean,
        default: true
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

user_schema.pre('save', function (next) {
    let user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next()
            })
        })
    } else {
        next();
    }
});

let User = mongoose.model("users", user_schema)

module.exports = {
    User
}