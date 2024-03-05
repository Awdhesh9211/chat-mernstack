
// creating asyncHandler for promisifing some async -->controller and funstion
const asyncHandler=(requestHandler)=>
                   (req,res,next)=>Promise
                   .resolve(requestHandler(req,res,next))
                   .catch((err)=>next(err));

export {asyncHandler}