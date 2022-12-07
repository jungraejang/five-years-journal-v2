var createError = require("http-errors");
require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
var indexRouter = require("./routes/index");

var app = express();
//**********************************************hide this later in ENV****************************************************************
const CONNECTION_URL =
  "mongodb+srv://silvercoated:wjdfo0124@cluster0.rdau8vc.mongodb.net/five-years-journal-v2?retryWrites=true&w=majority";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
// app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:19006",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
// app.use(express.urlencoded({ extended: false }));
// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     extended: true,
//     parameterLimit: 50000,
//   })
// );
// app.use(bodyParser.json({ limit: "50mb", extended: true }));
// app.use(bodyParser.text({ limit: "200mb" }));
app.use(bodyParser({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//ROUTES************************************************************************
app.use("/", indexRouter);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/question.routes")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const db = require("./models/index");
const Role = db.role;

db.mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Server is running on ${process.env.PORT || "8080"}`);
    initial();
  })
  .catch((error) => {
    console.error("Connection error", error);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
