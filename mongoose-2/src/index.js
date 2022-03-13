
const express = require("express");
const app = express();



//import for .use()
const usersController = require("./controllers/user.controllers.js");
const studentController = require("./controllers/student.controllers.js");
const batchController = require("./controllers/batch.controllers.js");
const evaluationController = require("./controllers/evaluation.controllers.js");
const submissionController = require("./controllers/submission.controllers.js");

app.use(express.json())

app.use("/users", usersController);

app.use("/students", studentController);

app.use("/batch", batchController);

app.use("/evaluations", evaluationController);

app.use("/submissions", submissionController);

module.exports = app;

