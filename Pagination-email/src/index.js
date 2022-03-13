const express = require('express');

const app = express();

app.use(express.json());

let userController = require('./contollers/user.contoller')

app.use("/users", userController)

module.exports = app;