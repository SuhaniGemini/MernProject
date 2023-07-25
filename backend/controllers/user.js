const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtSecret = "hjsbjsbjfbwjhbdejsbbj";

const login= async (req, res) => {
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
  }

const signup = async (req, res) => {
    const { email } = req.body;
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(404).json("User already registered");
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.status(200).json("User Registered");
    }
  }


  const checkLoginStatus= (req, res) => {
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
  }

  module.exports = {login,signup,checkLoginStatus}