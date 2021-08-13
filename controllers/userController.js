const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken')


const User = require('../models/userModel');

// @desc     Create new user
// @req      POST /api/users/
// @access   public

exports.createUser = asyncHandler(async (req,res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error('User Already Exists');
  }

  user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
})