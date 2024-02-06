const express = require('express');
const customerController = require('../controllers/customer');

const router = express.Router();

router.get('/',customerController.getCustomers);
router.post('/',customerController.customerSignup);
router.patch('/',customerController.updateCustomer);
router.delete('/',customerController.deleteCustomer);

router.post('/login',customerController.customerLogin);

module.exports = router;