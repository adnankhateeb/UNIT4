const express = require('express');

const app = express();
const userController = require('./controllers/users.controller');
const branchController = require('./controllers/branch.controller');
const masterController = require('./controllers/master.controllers')
app.use(express.json());

app.use('/users', userController);
app.use('/branch', branchController);
app.use('/master', masterController);


module.exports = app;
