const config = require("../config/auth.config");
const db = require("../models/index");
const {
  user: User,
  role: Role,
  refreshToken: RefreshToken,
  question: Question,
  answer: Answer,
} = db;

exports.getTodayQuestion = (req, res) => {
  let today = new Date();
  console.log("today", today);
  let month = today.getMonth() + 1;
  let day = today.getDate();

  console.log("today date", month, day, req.body);

  Question.findOne({
    postedBy: req.body.postedBy,
    month: month,
    day: day,

    // $where: () => {
    //   return this.postedAt.getDay() == day;
    // },
    // $where: () => {
    //   return this.postedAt.getMonth() == month;
    // },
  }).exec(async (err, response) => {
    console.log("response", response);
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res
      .status(200)
      .send({
        data: response,
        message: "today's question fetched successfully",
      });
  });
};

exports.getDefaultQuestion = (req, res) => {};

exports.saveQuestion = (req, res) => {
  let today = new Date();
  console.log("today", today);
  let month = today.getMonth() + 1;
  let day = today.getDate();
  console.log("req body", req.body);
  const question = new Question({
    question: req.body.question,
    postedBy: req.body.postedBy,
    postedAt: today,
    month: month,
    day: day,
  });

  question.save((err, question) => {
    console.log("question", question);
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: "question saved successfully" });
  });
};

exports.saveAnswer = (req, res) => {
  let today = new Date();
  console.log("today", today);
  let month = today.getMonth() + 1;
  let day = today.getDate();
  // let month = 11;
  // let day = 9;

  console.log("today date", month, day, req.body.postedBy);
  const answer = new Answer({
    answer: req.body.answer,
    postedBy: req.body.postedBy,
    postedAt: req.body.postedAt,
  });

  answer.save((err, resp) => {
    console.log("respppp", resp);
    if (err) {
      res.status(500).send({ message: err });
    }
    Question.updateOne(
      {
        postedBy: req.body.postedBy,
        month: month,
        day: day,
      },
      {
        $push: {
          answers: resp,
        },
      }
    ).exec(async (err, question) => {
      console.log("question", question);
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ question, message: "answer saved successfully" });
    });
  });
};
