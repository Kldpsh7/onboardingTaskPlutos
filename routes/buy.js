const express = require('express');
const buyController = require('../controllers/buy');
const authentication = require('../middleware/authentication');

const router = express.Router();

router.get('/',authentication,buyController.buy);

module.exports = router;