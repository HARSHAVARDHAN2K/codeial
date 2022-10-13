const express = require('express');
const router = express.Router();

console.log('router loaded');

//Controller
const homecontroller = require('../controllers/home_controller');

router.get('/', homecontroller.home);
//whenever we find the /users details this index access users router
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

//exporting the router
module.exports = router;