require('dotenv').config()
var createError = require("http-errors");
var express = require("express");
const { readdirSync } = require("fs");
var path = require("path");

var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@api.zhz3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB CONNECTED SUCCESFULLY!");
    console.log(mongoose.connection.readyState);
  })
  .catch((err) => console.log(err));

app.set("views", __dirname + "/views"); // general config
app.set("view engine", "jade");

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", indexRouter);
app.use("/user", userRouter);

module.exports = app;
