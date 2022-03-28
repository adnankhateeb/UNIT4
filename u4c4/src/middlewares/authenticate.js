require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'adnan', (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
};

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization)
    return res
      .status(401)
      .send({ message: 'Authorization token not found or incorrect' });

  if (!req.headers.authorization.startsWith('Bearer '))
    return res
      .status(401)
      .send({ message: 'Authorization token not found or incorrect' });

  const token = req.headers.authorization.trim().split(' ')[1];

  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Authorization token not found or incorrect' });
  }

  req.userID = decoded.user._id;

  return next();
};

module.exports = authenticate;
