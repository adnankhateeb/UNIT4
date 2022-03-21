const express = require('express');

const app = express();

app.use(express.json());
const registerController = require('./controllers/register.contoller');

app.use('/register', registerController);


module.exports = app;