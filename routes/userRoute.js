const express = require('express');
const { createUser,authUser,validateUser } = require('../controllers/userController');
const router = express.Router();


// protect routes //
const {protect} = require('../middlewares/authMiddleware')


router.get('/',(req,res) => {
  res.send("Node.js & Express REST API fot Authentication - signup/login");
});

router.post('/signup',createUser);
router.post('/login',authUser);
router.route('/home').get(protect, validateUser)

module.exports = router;




