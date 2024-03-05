import mongoose from "mongoose";
const {Schema,model}=mongoose;
const userSchema=new Schema({
    fullName:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true,minLength:[6,"Password shoud be at least 6 character"]},
    gender:{type:String,required:true,enum:["male","female"]},
    profileId:{type:String,default:""},
    profilePic:{type:String,default:""},
},{timestamps:true})
export const User =model("User",userSchema);
