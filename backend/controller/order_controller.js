const {
    Order
} = require("../models/order_model");
const bcrypt = require('bcrypt');
const {
    superSecret
} = require('../config/config');

//create order

let createOrder = (req, res) => {
    let data = req.body
    console.log(data)
    console.log(req.file)
    let order = new Order();
    order.customer_name = data.customer_name
    order.phone = data.phone
    order.email = data.email
    order.created_date = data.created_date
    order.close_date = data.close_date
    order.item = data.item
    order.created_by = data.created_by
    order.image = ("http://localhost:3000/" + req.file.path)
    order.work_list = data.work_list
    
    order.save().then(orders => res.json(orders)).catch(e => res.json(e));
};

//recognize order

let readOrder = (request, reply) => {
    Order.findOne({
        where: {
          slug: request.params.slug
        }
      })
      .then((result) => {
        reply(result);
      });
};

module.exports = {
    createOrder,
    readOrder
}