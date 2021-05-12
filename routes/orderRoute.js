const express = require("express");
const router = express.Router();

const { allOrders } = require("../controllers/customers/orderController");

router.route("/").post(allOrders);

module.exports = router;
