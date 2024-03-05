import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUser=asyncHandler(async (req,res,next)=>{

// get loggedInUser
  const loggedInUserId=req.user?._id;
  
// fetch all User exclude logged InUser
  const allUser=await User.find({_id:{$ne:loggedInUserId}}).select("-password -email")
  res.status(200).json(allUser);
  
})
