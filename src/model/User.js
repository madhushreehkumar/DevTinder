const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        minlength:3,
        maxlength:50
    },
    lastName : {
        type : String,
        minlength:4,
        maxlength:50
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    }
});


module.exports = mongoose.model("User",userSchema);