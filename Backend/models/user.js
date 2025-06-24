const {Schema,model} = require("mongoose");

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    profileImage:{
        type:String,
        default: "/images/default.png",
    },
},{timestamps:true});

const User = model("User",userSchema);
module.exports = User;