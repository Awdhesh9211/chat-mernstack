import jwt from "jsonwebtoken";

const genTokenSetCookie=(userId,res)=>{
   
   // creating token on the basis of _id,"secret"
   const token=jwt.sign({_id:userId},"secret",{expiresIn:'15d'});

   // set token into cookie
     res.cookie("JWT",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,//prevent XSS attack-- cross-site-scripting
        sameSite:"strict"//CSRF attack-- Cross-site-request-forgery
     })
}

export default genTokenSetCookie;