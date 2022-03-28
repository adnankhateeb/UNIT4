const Todo = require('../models/todo.model');

const authorize = async (req, res, next) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (todo.userId === req.userId) {
      return next();
    }

    return res.status(401).send('Authorization unsuccessful');
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = authorize;
