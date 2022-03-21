const express = require('express');

const app = express();

app.use(express.json());
const registerController = require('./controllers/register.contoller');
const commentController = require('./controllers/comment.controller');
const bookController = require('./controllers/book.controller');
const loginController = require('./controllers/login.controller');

app.use('/register', registerController);
app.use('/comments', commentController);
app.use('/books', bookController);
app.use('/login', loginController);

module.exports = app;
