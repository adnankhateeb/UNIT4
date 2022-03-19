const express = require('express');
const userController = require('./controllers/user.controllers');
const postController = require('./controllers/post.controllers');

const regController = require('./controllers/reg.controllers');
const loginController = require('./controllers/login.controllers');
const app = express();

app.use(express.json());

app.use('/users', userController);

app.use('/register', regController);

app.use('/login', loginController);

app.use('/posts', postController);


module.exports = app;
