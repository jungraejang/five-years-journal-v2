const mongoose = require("mongoose");

const DefaultQuestion = mongoose.model(
  "DefaultQuestion",
  new mongoose.Schema({
    question: String,
    postedAt: Date,
    month: Number,
    day: Number,
  })
);

module.exports = DefaultQuestion;
