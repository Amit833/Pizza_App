const express = require("express");
const router = express.Router();

const {
  register,
  postRegister,
} = require("../controllers/customers/authController");

router.route("/").get(register);
router.route("/").post(postRegister);

module.exports = router;
