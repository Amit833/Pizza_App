const User = require("../../models/userModel");
exports.register = async (req, res, next) => {
  res.render("auth/register");
};

exports.postRegister = async (req, res, next) => {
  //   const { name, email, password } = req.body;
  //   console.log(req.body);

  const info = req.body;
  try {
    const user = new User(info);
    await user.save();

    // const token = user.generateToken();
    // // Send an email to verification from admin email
    // sendVerificationEmail(user);
    // res.cookie("token", token, {
    //   expires: new Date(Date.now() + 604800000),
    //   httpOnly: true,
    // });
    res.json(user);
    // res.redirect("/");
  } catch (err) {
    next(err);
  }
};
