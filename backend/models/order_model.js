const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

let order_schema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: true
    },
    customer_name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: false,
        minlength: 5,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not valid email"
        }
    },
    created_date: {
        type: Date,
        required: true
    },
    close_date: {
        type: Date
    },
    item: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    work_list: {
        profilaktika: {
            type: String
        },
        pilna_profilaktika: {
            type: String
        },
        pavaru_reguliavimas: {
            type: String
        },
        stabdziu_reguliavimas: {
            type: String
        },
        ratu_tiesinimas: {
            type: String
        },
        kameros_keitimas: {
            type: String
        },
        kita: {
            type: String
        }
    },
    photo_id: {
        type: String
    },
    image: {
        type: String
    }
});

order_schema.pre('save', function (next) {
    let order = this
    if (order.isModified('email')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(order.email, salt, (error, hash) => {
                order.email = hash;
                next()
            })
        })
    } else {
        next();
    }
});

let Order = mongoose.model("orders", order_schema)

module.exports = {
    Order
}