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
      token: generateToken({ 
      id: user.id,
      name: user.name,
      email: user.email,
      }),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

// @desc     Auth user & get token
// @req      POST /api/users/login
// @access   public
exports.authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken({ 
        id: user.id,
        name: user.name,
        email: user.email,
        }),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Credentails');
  }
});

// @desc     Get active user's profile
// @req      GET /api/users/profile
// @access   private
exports.validateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User Not Found');
  }
  res.status(200).json({
    success: true,
    id: user.id,
    name: user.name,
    email: user.email,
  });
});