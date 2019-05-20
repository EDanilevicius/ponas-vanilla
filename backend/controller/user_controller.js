const {
    User
} = require("../models/user_model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
    superSecret
} = require('../config/config');

//createUser

let createUser = (req, res) => {
    let data = req.body
    let user = new User();
    user.staff_name = data.staff_name
    user.password = data.password
    user.email = data.email
    user.save().then(useris => res.json(useris)).catch(e => res.json(e));
}

//login

let login = (req, res) => {
    let staff_name = req.body.staff_name
    User.findOne({
        staff_name
    }).then((user) => {
        if (!user) {
            res.json("No such user")
            return
        }
        bcrypt.compare(req.body.password, user.password, (err, response) => {
            if (response) {
                let access = 'auth'
                jwt.sign(
                    {
                        _id: user._id.toHexString(),
                        access
                    },
                    superSecret,
                    {
                        expiresIn: 36000
                    },
                    (error, token) => {
                        user.tokens.push({
                            access,
                            token
                        })
                        user.save().then(() => {
                            res.header('x-auth', token).json(user)
                        })
                    })
            } else {
                res.json("Incorrect username or password")
                return
            }
        });
    });
};

//logout

let logout = (req, res) => {
    let token = req.token
    let user = req.user
    user.update({
        $pull: {
            tokens: {
                token
            }
        }
    }).then(() => {
        res.json("Logged out")
    }).catch(e => res.json(e))
};

//export
module.exports = {
    createUser,
    login,
    logout
}