const express = require("express");
const router = express.Router();
const {login,signup,checkLoginStatus} = require("../controllers/user.js");
router.post("/signup", signup);
router.post("/login", login);
router.get("/checkLoginStatus", checkLoginStatus);

module.exports = router;
