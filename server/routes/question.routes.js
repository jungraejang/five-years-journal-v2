const controller = require("../controllers/question.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/question/getTodayQuestion", controller.getTodayQuestion);
  app.get("/api/question/getDefaultQuestion", controller.getDefaultQuestion);

  app.post("/api/question/saveQuestion", controller.saveQuestion);
  app.post("/api/question/saveAnswer", controller.saveAnswer);
  app.get(
    "/api/question/saveDefaultQuestions",
    controller.saveDefaultQuestions
  );
};
