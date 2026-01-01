const express = require("express");
const userAuth = require("../middleware/auth")
const User = require("../model/User");

const profileRouter = express.Router();

profileRouter.get("/profile",userAuth,async(req,res)=>{

 try{
    
  const data = req.user;
  res.send(data);
 }catch(err){
  res.status(400).send("Error:"+err.message)
 }
 
 // res.send("token fetched successfully")
})

profileRouter.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error Occured");
  }
});

profileRouter.get("/user", async (req, res) => {
  const userDetail = req.body.email;

  try {
    const userdetail = await User.find({ email: userDetail });

    if (userdetail.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(userdetail);
    }
  } catch (err) {
    res.status(400).send("Error Occured");
  }
});

profileRouter.delete("/user", async (req, res) => {
  //console.log(req.body);
  const userid = "692ee55c4aefbd5068182229";
  // const userid = req.body._id;
  //console.log(userid)
  try {
    const data = await User.findByIdAndDelete({ _id: userid });

    if (data) {
      res.send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    // Log the error for debugging
    console.error("Error while deleting user:", err);
    res.status(500).send("Error occurred while deleting user");
  }
});

profileRouter.patch("/user", async (req, res) => {
  const userid = req.body.id;
  const data = req.body;

  try {
    const updatedata = await User.findByIdAndUpdate({ _id: userid }, data);
    res.send("Updated successfully",+updatedata);
  } catch (err) {
    // Log the error for debugging
    console.error("Error while deleting user:", err);
    res.status(500).send("Error occurred while deleting user");
  }
});


module.exports=profileRouter;