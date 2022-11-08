const mongoose = require("mongoose");

const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    question: String,
    postedBy: String,
    postedAt: Date,
    month: Number,
    day: Number,
    answers: [
      {
        type: mongoose.Schema.Types.Mixed,
        ref: "Answer",
      },
    ],
  })
);

module.exports = Question;
