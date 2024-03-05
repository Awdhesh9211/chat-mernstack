import dotenv from "dotenv";
dotenv.config({path:"./config.env"});
import express from "express";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import { app, server} from "./socket/socket.js";
import path  from "path";
import { connectDB } from "./db/Db.js";

import authRouter from "./routes/auth.route.js";
import messagesRouter from './routes/message.route.js';
import userRouter from './routes/user.route.js';



const __dirname=path.resolve();



// middeleware
app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname,"dist")));
// routes
app.use('/api/auth',authRouter);
app.use('/api/messages',messagesRouter);
app.use('/api/',userRouter)


connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY__NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

server.listen(5000,()=>{
    console.log("Server is running on port :5000");
})