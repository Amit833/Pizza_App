const express = require("express");
const router = express.Router();

const {
  cartController,
  updateCart,
} = require("../controllers/customers/cartController");

router.route("/").get(cartController);
router.route("/").post(updateCart);

module.exports = router;
