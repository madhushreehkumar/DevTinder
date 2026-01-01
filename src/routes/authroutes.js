const express = require("express");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateSignUp } = require("../Utils/Validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);

    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
 
    if (!user) {
      throw new Error("Email not exist, please Signup");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {

      const token = await jwt.sign({_id:user._id},"Devtinder@123");
    
      res.cookie("token",token)
      res.send("Login Successfull");
    } else {
      throw new Error("Password is not correct, Please retry");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

module.exports=authRouter;