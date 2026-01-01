const express = require("express");
const connectdb = require("./config/database");
const app = express();
const cookieparaser = require("cookie-parser");

app.use(express.json());
app.use(cookieparaser());

const authRouter = require("./routes/authroutes");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


//import all routes

//signup
//login
//to get profile data
//to get user data by email
//to get all users
//delete by ID
//to update the data

connectdb()
  .then(() => {
    console.log("DB connected successfully");
    app.listen("7777", () => {
      console.log("App started to listen");
    });
  })
  .catch((err) => {
    console.error("Error occured", err);
  });
