const express = require('express');

const app = express();
const userController = require('./controllers/users.controller');
const branchController = require('./controllers/branch.controller');
const masterController = require('./controllers/master.controllers');
const fixedController = require('./controllers/fixed.controllers');
const savingController = require('./controllers/savings.controller');
app.use(express.json());

app.use('/users', userController);
app.use('/branch', branchController);
app.use('/master', masterController);
app.use('/fixed', fixedController);
app.use('/savings', savingController);

module.exports = app;
