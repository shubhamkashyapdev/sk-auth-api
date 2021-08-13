const jwt = require('jsonwebtoken')

const generateToken = (userData) => {
  return jwt.sign( userData , process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '1h',
  });
};

module.exports = generateToken;
