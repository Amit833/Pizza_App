const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../config/config");

// JWT Secret to create and validate tokens
const ourSuperSecretKey = env.jwt_key;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    address: { type: String },
    mobile: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    cart: { type: Array, default: [] },
    wishlist: { type: Array, default: [] },
    confirmed: { type: Boolean, default: false },
    activeToken: { type: String },
    id: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// password hashing
UserSchema.pre("save", function() {
  user = this;
  if (this.isModified("password")) {
    user.password = bcryptjs.hashSync(user.password, 10);
  }
});

// generate token

UserSchema.methods.generateToken = function() {
  user = this;
  token = jwt
    .sign({ _id: user._id.toString() }, ourSuperSecretKey, {
      expiresIn: "1 day",
    })
    .toString();
  user.activeToken = token; // I send the token inside the schema this is optional
  return token;
};

// verify the  token
UserSchema.statics.findByToken = function(token) {
  const User = this;

  // Decode the cookie
  try {
    // did we veryfing (token, ourSuperSecretKey)? yes
    let decoded = jwt.verify(token, ourSuperSecretKey);
    console.log(`decoded`, decoded);
    return User.findOne({ _id: decoded._id });
  } catch (error) {
    return;
  }
};

module.exports = mongoose.model("Users", UserSchema);
