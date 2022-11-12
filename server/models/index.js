const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");
db.question = require("./question.model");
db.answer = require("./answer.model");
db.defaultQuestion = require("./defaultquestion.model");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
