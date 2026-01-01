const jwt = require("jsonwebtoken");
const User = require("../model/User");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token!!!");
    }

    const decoded = await jwt.verify(token, "Devtinder@123");

    const { _id } = decoded;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User is not exist");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
};

module.exports = userAuth;
