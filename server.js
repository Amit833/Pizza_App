require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const userRouter = require("./routes/userRouter");
const webRouter = require("./routes/webRouter");
const cartRouter = require("./routes/cartRouter");
const authRouter = require("./routes/authRouter");
const orderRouter = require("./routes/orderRoute");
// const ejs = require("ejs");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")(session);
const expresslayout = require("express-ejs-layouts");
const env = require("./config/config");

const ourSuperSecretKey = env.jwt_key;

// ENVIRONMENT - CHECK MINIMUM REQUIRED CONFIGURATION FOR STARTUP...
require("./helpers/env-check"); // this will cancel the startup if necessary env variables are missing...

//set Template engine
app.use(expresslayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(cors());
app.use(flash());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// session store
let mongoStore = new MongoDbStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions",
});

// session config
app.use(
  session({
    secret: ourSuperSecretKey,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24h
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// connect to MongoDB
require("./helpers/db-connect");

// global session middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.users = req.users;
  next();
});

//Routes

app.use("/users", userRouter);
app.use("/home", webRouter);
app.use("/cart", cartRouter);
app.use("/register", authRouter);
app.use("/orders", orderRouter);

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// central error handling

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    centralError: {
      message: err.message,
    },
  });
});
