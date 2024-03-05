import mongoose from "mongoose";
const {Schema,model}=mongoose;
const msgSchema=new Schema({
    senderId:{
        type:Schema.ObjectId,
        ref:"user",
        required:true
    },
    receiverId:{
        type:Schema.ObjectId,
        ref:"user",
        required:true
    },
    message:{type:String,required:true},
},{timestamps:true})
export const Message =model("Message",msgSchema);