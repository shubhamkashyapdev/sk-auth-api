const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');



exports.protect = asyncHandler(async (req, res, next) => {
  // get token //
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // decode the token //
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.id;
      const user = await User.findById(id).select('-password');
      req.user = user;
      console.log(req.user);
      next();
    } catch (err) {
      console.error(err.message);
      res.status(401);
      throw new Error('Not Authorized, Token Failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized To Access This Route');
  }
});
