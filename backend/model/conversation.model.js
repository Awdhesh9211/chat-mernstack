import mongoose from "mongoose";
const {Schema,model}=mongoose;
const conversationSchema=new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    messages:[{
        type:Schema.Types.ObjectId,
        ref:"Message",
        default:[],
    }],
},{timestamps:true})
export const Conversation =model("Conversation",conversationSchema);
