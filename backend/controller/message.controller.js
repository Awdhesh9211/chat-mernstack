import { Conversation } from "../model/conversation.model.js";
import { Message } from "../model/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const sendMessage =asyncHandler( async (req, res,next) => {
	// getting message , senderId,receiverId 
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;
    // check conversation exist between them
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});
    //  if not exist then create between them
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}
    //  creating message instance with data containing message , senderId,receiverId 
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});
    // if newmessage exist then store inthe conversation.messages[...{preMessage},{newMessage._id}]  
		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		
    //   exec await conversation.save(); await newMessage.save(); in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
	// it returns userSocketMap[receiverId] //socketid      // userSocketMap[receiverId:socket.id,....]
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
  })

export const getMessages =asyncHandler(async (req, res,next) => {
	
//  userToChatId(from param),senderId(from req.user._id)
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;

//  fetching all messages between senderId and userToChatId 
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  }).populate("messages"); 

// if they are first time to chat then send [] json data
  if (!conversation) return res.status(200).json([]);

// if message available then conversation.messages in json
  const messages = conversation.messages;
  res.status(200).json(messages);
})
