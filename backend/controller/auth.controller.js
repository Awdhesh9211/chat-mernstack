import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import genTokenSetCookie from "../utils/genJWT.js";
import bcrypt from 'bcrypt';
import cloudinary from "cloudinary";


export const signup=asyncHandler(async(req,res,next)=>{

    const {fullName,username,password,confirmPassword,gender,image}=req.body;

    if(password!=confirmPassword) return res.status(400).json({error:"Password do not matched.."});

    const user=await User.findOne({username})

    if(user) return res.status(400).json({error:"User already exist..."});

    // const profilePic= gender==="male" ? `https://avatar.iran.liara.run/public/boy?username=${username}`:`https://avatar.iran.liara.run/public/girl?username=${username}`;


    const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "profiles",
        width: 150,
        crop: "scale",
      });
 
    // hash
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);

    const newUser=await User({
        fullName,
        username,
        gender,
        password:hashPassword,
        profileId:myCloud.public_id,
        profilePic:myCloud.secure_url
    })


    if(newUser){
        // generate Token
        genTokenSetCookie(newUser._id,res);

        await newUser.save(); 

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profileId:newUser.profileId,
            profilePic:newUser.profilePic,
        });
    }else{
        return res.status(500).json({error:"Internal Server Error"});
    }
})

export const login=asyncHandler(async(req,res,next)=>{
   
    const {username,password}=req.body;
   
    const user=await User.findOne({username});
  
    const isPasswordCorrect=await bcrypt.compare(password,user.password);

    if(!user && !isPasswordCorrect){
        return res.status(400).json({error:"Invalid Username or password"});
    }

    genTokenSetCookie(user._id,res);

    res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        username:user.username,
        profilePic:user.profilePic,
    })
})

export const logout=asyncHandler(async(req,res,next)=>{
    res.cookie("JWT","", {
        maxAge: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        message:"Logged Out Successfully..",
    })
})