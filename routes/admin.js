const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


router.post('/add-product', adminController.postAddProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
