import jwt from 'jsonwebtoken';
import { User } from '../model/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const auth=asyncHandler(async(req,res,next)=>{
   console.log("Auth Called");
    const {JWT}= req.cookies;
     
    console.log(JWT);

    if(!JWT) return res.status(401).json({error:"Unauthorized"});

    const decode=jwt.verify(JWT,"secret");

    if(!decode) return res.status(401).json({error:"Unauthorized"});
    console.log(decode._id);
    const user=await User.findById(decode._id).select("-password");
    console.log(user);
    if(!user){
     return res.status(404).json({error:"User Not Found"});
    }
   
    req.user=user;
    next();
})