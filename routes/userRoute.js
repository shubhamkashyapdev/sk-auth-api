const express = require('express');
const { createUser } = require('../controllers/userController');
const router = express.Router();



router.get('/',(req,res) => {
  res.send("Get User");
});

router.post('/',createUser);

module.exports = router;




