const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");

const {
  getUser,
  getUsers,
  addUser,
  login,
  updateUser,
  deleteUser,
  verifyUserAccount,
} = require("../controllers/usersControllers");

router.route("/").get(getUsers).post(addUser);
router.route("/login").post(login);

router.route("/:id").get(auth, getUser).put(updateUser).delete(deleteUser);

// Route for verifying the user account
//router.route("/verify").post(verif, verifyUserAccount);

// Taking care of the Google login
//router.route('/googleLogin').post(loginUserGoogle);

module.exports = router;
