import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import Jwt  from "jsonwebtoken";


const verifyJwt = asyncHandler(async(req, _, next)=>{
  try {
    const token  = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if(!token){
        throw new ApiError(401, "unauthorize request")
    }
    const decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user =  await User.findById(decodedToken._id).select("-password -refreshToken")
     if(!user){
        throw new ApiError(401, "invalid access Token")
     }
     req.user = user
     next()
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid access Token")
  }
   
}) 
export {verifyJwt}