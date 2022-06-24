const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
var bcrypt = require('bcryptjs');
const JWT_SECRET = 'mycodepassword';
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');

router.post('/createuser', [
  body('password', "Password must be atleast 5 characters!").isLength({ min: 5, max: 15 }),
  body('name', "Name must be atleast 3 characters!").isLength({ min: 3 }),
  body('email', "Enter a valid Email!").isEmail()
], async (req, res) => {
let success= false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: "User already exits!" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email
    })
    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    console.log(authToken);
    res.json({success, authToken })
  }
  catch (error) {
    // alert(error.message);
  }
})
// const user = User(req.body);
// user.save();
// res.send(req.body);
router.post('/login', [
  body('email', "Enter a valid Email!").isEmail(),
  body('password', "Enter a valid Password!").exists()
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: "Wrong Credentials!" });
    }
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ success, error: "Wrong Credentials!" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken })
  } catch (error) {
    res.status(500).send("Some error occurred!");
  }
});

// Get Loggd In user details :Post with login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
    console.log(user)
  } catch (error) {
    res.status(500).send("Internal server error!")
  }
})
module.exports = router