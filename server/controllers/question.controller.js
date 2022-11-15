const db = require("../models/index");
const {
  user: User,
  role: Role,
  refreshToken: RefreshToken,
  question: Question,
  answer: Answer,
  defaultQuestion: DefaultQuestion,
} = db;
var AWS = require("aws-sdk");
const { question } = require("../models/index");

//use AWS to detect text from image then save them to default question db
//Move this function to separate file
exports.saveDefaultQuestions = async (req, res) => {
  const bucket = "default-questions"; // the bucketname without s3://

  const config = new AWS.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  AWS.config.update({ region: "us-east-1" });
  const client = new AWS.Rekognition();

  let result = [];

  let months = {
    JANUARY: 1,
    FEBRUARY: 2,
    MARCH: 3,
    APRIL: 4,
    MAY: 5,
    JUNE: 6,
    JULY: 7,
    AUGUST: 8,
    SEPTEMBER: 9,
    OCTOBER: 10,
    NOVEMBER: 11,
    DECEMBER: 12,
  };

  const getDataFromS3 = async (i) => {
    //aws does not return promise thus create custom promise.
    //Useful for api call using for loop
    return new Promise((resolve, reject) => {
      const params = {
        Image: {
          S3Object: {
            Bucket: bucket,
            Name: `IMG_${i}.JPG`,
          },
        },
      };
      client.detectText(params, function (err, response) {
        if (err) {
          console.log("aws error:", err, err.stack); // handle error if an error occurred
          reject(err);
        } else {
          let questionData = {};

          if (Number(response.TextDetections[0].DetectedText)) {
            questionData.day = Number(response.TextDetections[0].DetectedText);
            questionData.month =
              months[response.TextDetections[1].DetectedText];

            if (Number(response.TextDetections[3].DetectedText)) {
              questionData.question = response.TextDetections[2].DetectedText;
            } else {
              questionData.question =
                response.TextDetections[2].DetectedText +
                " " +
                response.TextDetections[3].DetectedText;
            }
            if (!Number(response.TextDetections[3].DetectedText)) {
              questionData.question =
                response.TextDetections[2].DetectedText +
                " " +
                response.TextDetections[3].DetectedText +
                " " +
                response.TextDetections[4].DetectedText;
            }
          } else {
            questionData.month =
              months[response.TextDetections[0].DetectedText];
            if (Number(response.TextDetections[2].DetectedText)) {
              questionData.day = Number(
                response.TextDetections[2].DetectedText
              );
              questionData.question = response.TextDetections[1].DetectedText;
            } else {
              questionData.day = Number(
                response.TextDetections[3].DetectedText
              );
              questionData.question =
                response.TextDetections[1].DetectedText +
                " " +
                response.TextDetections[2].DetectedText;
            }
          }

          const defaultQuestion = new DefaultQuestion({
            question: questionData.question,
            postedAt: new Date().toISOString(),
            month: questionData.month,
            day: questionData.day,
          });

          defaultQuestion.save((err, question) => {
            console.log("default question", question);
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            resolve();
          });

          console.log("questionData", questionData);
          result.push(questionData);
        }
      });
    });
  };
  //matches the last digits of photo filename
  for (let i = 8719; i <= 8902; i++) {
    await getDataFromS3(i);
  }
  console.log("result::::::", result);
  res.status(200).send({
    data: result,
    message: "default questions data",
  });
};

exports.getTodayQuestion = (req, res) => {
  let today = new Date();
  console.log("today", today);
  let month = today.getMonth() + 1;
  let day = today.getDate();

  console.log("today date", month, day, req.body);
  //find a today's question from question db
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
    //check if question has been found, if not run code inside if
    if (!response) {
      DefaultQuestion.findOne(
        {
          month: month,
          day: day,
        },
        (err, defaultQuestion) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          const question = new Question({
            question: defaultQuestion.question,
            postedBy: req.body.postedBy,
            postedAt: today,
            month: month,
            day: day,
          });
          question.save((err, question) => {
            console.log("new question from default", question);
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.status(200).send({
              data: question,
              message:
                "default question saved and today's question fetched successfully",
            });
          });
          console.log("default question", question);
        }
      );
    } else {
      res.status(200).send({
        data: response,
        message: "today's question fetched successfully",
      });
    }
  });
};

exports.getDefaultQuestion = (req, res) => {
  let today = new Date();
  console.log("today", today);
  let month = today.getMonth() + 1;
  let day = today.getDate();
  DefaultQuestion.findOne({ month: month, day: day }, (err, question) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      message: "fetched today's default question successfully",
      data: question,
    });
  });
};

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
