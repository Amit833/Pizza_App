const User = require("../models/userModel");
const { customError } = require("../helpers/customError");
const bcryptjs = require("bcryptjs");
const { sendVerificationEmail } = require("../mailer/setup");

exports.getUsers = async (req, res, next) => {
  const users = await User.find().sort({ firstName: 1 });
  res.send(users);
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    // find the user first
    let user = await User.findById(id); //anotherway let user = await User.findByIdAndUpdate(id, req.body, { new: true });

    // then update the user fields.
    Object.assign(user, req.body); // user = which user object we faund. req.body = what we want to uodate
    const userUpdated = await user.save(); // => this will trigger the pre save hook
    res.json(userUpdated);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    let userDeleted = await User.findByIdAndDelete(id);
    if (!userDeleted) throw new Error();
    res.json(userDeleted);
  } catch (err) {
    next(customError(`Todo with ID ${id} does not exist`));
  }
};

// signup
exports.addUser = async (req, res, next) => {
  const info = req.body;
  try {
    const user = new User(info);
    await user.save();

    const token = user.generateToken();
    // Send an email to verification from admin email
    sendVerificationEmail(user);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 604800000),
      httpOnly: true,
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// login (here i should varify hashed password and also the token)
// if hashed password and token are matched then i an login

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return next(
        customError(
          `Not found this user with email ${email}. Try again...`,
          401
        )
      );
    }

    // if user is found then compare the password
    const passwordComparing = bcryptjs.compare(password, userFound.password);
    if (!passwordComparing) {
      return next(customError(`wrong password!`, 401));
    }

    // if password is matched I can login
    // now I generate a token with this user althow I generate token when sign up
    // I think I don't need to generate token when sign up.It is necessary only when login
    // In which case I should verify the token? I think only when i want to move private routes

    const token = userFound.generateToken();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 604800000),
      httpOnly: true,
    });

    res.json(userFound);
  } catch (error) {}
};
