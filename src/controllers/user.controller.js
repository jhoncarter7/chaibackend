import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // first we  get userdata
  const { username, fullName, email, password } = req.body;
  //chech user field is filled or empty
  if (
    [username, fullName, email, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  //check user is existed or not
  const userExisted = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (userExisted) {
    throw new ApiError(
      409,
      "User is already exist with this email or username"
    );
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "all fields are required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "all fields are required");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    password,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
  });
});

const createdUser = await User.findById(user._id).select(
  "-password -refreshToken"
);
if (!createdUser) {
  throw new ApiError(500, "something went wrong while registering the user");
}
return res
  .status(201)
  .json(new ApiResponse(200, createdUser, "user registered successfully"));

export { registerUser };
