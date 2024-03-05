import { Server } from "socket.io";
import http from "http";
import express  from "express";


const app=express();
const server=http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});


const userSocketMap={};  //{userId:socketId}
export const getReceiverSocketId=(receiver)=>{
    return userSocketMap[receiver];
}
io.on("connection",(socket)=>{
     console.log(socket.id);
     const userId=socket.handshake.query.userId;

     if(userId != "undefined"){
        userSocketMap[userId]=socket.id;
     }

    //  emit online Users
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on('disconnect',()=>{
       delete userSocketMap[userId];

    //    emit online user on user disconnected
       io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

export {app,io,server};