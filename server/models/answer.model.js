const mongoose = require("mongoose");

const Answer = mongoose.model(
  "Answer",
  new mongoose.Schema({
    answer: String,
    postedBy: String,
    postedAt: Date,
  })
);

module.exports = Answer;
