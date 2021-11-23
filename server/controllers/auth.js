//Login User
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../models/user");
const ENV = process.env;
// register user
exports.Register = async (req, res) => {
  try {
    let { email, password } = req.body; //req body
    let user = await User.findOne({ email: email }); // check if user already exists
    if (user) return res.status(404).json({ message: "User already exists." });
    req.body.password = await bcrypt.hash(password, +ENV.BCRYPT_SALT); // hashing password
    user = await User.create(req.body);

    res.json({ message: "User created successfully." });
  } catch (error) {
    console.log(error.message, "error.message");
    res.json({ message: error.message });
  }
};
// login user
exports.Login = async (req, res) => {
  try {
    const data = req.body;

    let user = await User.findOne({ email: data.email }); // Check if user exist

    if (!user) return res.status(404).json({ message: "Invalid Email!" });
    const isCorrect = await bcrypt.compare(data.password, user.password); // Check if user password is correct
    if (!isCorrect)
      return res.status(404).json({ message: "Invalid Password!" });

    const token = JWT.sign({ id: user._id, role: user.role }, ENV.JWT_SECRET); //token generation

    const result = {
      user,
      token,
    };
    res.json({ message: "User Login Successfully", result });
  } catch (error) {
    console.log("Error--->", error.message);
    res.status(500).json({ message: error.message });
  }
};
