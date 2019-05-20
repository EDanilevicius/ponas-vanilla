const router = require("express").Router();
const user_controller = require('../controller/user_controller');
const order_controller = require('../controller/order_controller');
const middleware = require('../middleware/middleware');
const upload = require('../controller/image_controller');

router.get('/', (request, response) => {
  response.json({
    status: 200,
    message: "API is working correctly"
  });
});
//Staff user section//
//create UserSchema
router.route('/user')
  .post(user_controller.createUser)

//login
router.route('/login')
  .post(user_controller.login)

//logout
router.route('/logout')
  .get(middleware.authenticate, user_controller.logout)

//create Order
router.route('/order')
  .post(upload.single('item_photo'), order_controller.createOrder)


module.exports = router;