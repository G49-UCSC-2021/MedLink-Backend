const express = require('express');
// eslint-disable-next-line camelcase
const { requireSignin, customerMiddleware } = require('../common-middleware');
const { buyinghistory } = require('../controller/buyinghistory');

const router = express.Router();

// router.post('/order/completeorder', requireSignin, customerMiddleware, completeorder);
router.post('/customer/buyinghistory', requireSignin, customerMiddleware, buyinghistory);
