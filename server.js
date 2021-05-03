require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const userRouter = require("./routes/userRouter");
const ejs = require("ejs");
const expresslayout = require("express-ejs-layouts");

// ENVIRONMENT - CHECK MINIMUM REQUIRED CONFIGURATION FOR STARTUP...
require("./helpers/env-check"); // this will cancel the startup if necessary env variables are missing...

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

//set Template engine
app.use(expresslayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// connect to MongoDB
require("./helpers/db-connect");

//Routes
app.use("/users", userRouter);

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
