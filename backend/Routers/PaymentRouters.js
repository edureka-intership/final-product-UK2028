const express = require('express');
const controller = require('../Controllers/PaymentController');

const paymentRouters = express.Router();

paymentRouters.post('/order',controller.createOrders);

paymentRouters.post('/save',controller.saveTransaction);


module.exports=paymentRouters;