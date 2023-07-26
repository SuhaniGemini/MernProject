const userModel = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user && user.password === password) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie("token", token, { httpOnly: true }).json(user);
        }
      );
    } else {
      res.status(422).json("Not found");
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const signup = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(409).json("User already registered");
    } else {
      const data = userModel(req.body);
      const save = await data.save();
      res.status(200).json("User Registered");
    }
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const checkLoginStatus = (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json(null);
      } else {
        const { email, id } = decoded;
        const user = { email, id };
        res.json(user);
      }
    });
  } else {
    res.status(401).json(null);
  }
};

module.exports = { login, signup, checkLoginStatus };
