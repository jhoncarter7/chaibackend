import { Router } from "express";
import { getCurrentUser, getUserChannelProfile, getWatchHistory, refreshAccessToken, registerUser, updateAccountDetails, updateAvatar, updateCoverImage, updatePassword, userLogOut, userLogin } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1
    },
    {
      name: "coverImage",
      maxCount: 1
    }
  ]),
  registerUser
);
router.route("/loggedIn").post(userLogin)
router.route("/loggedOut").post(verifyJwt, userLogOut)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/update-Password").post(verifyJwt, updatePassword)
router.route("/current-user").get(verifyJwt, getCurrentUser)
router.route("/update-acc").patch(verifyJwt, updateAccountDetails)
router.route("/avatar").patch(verifyJwt, upload.single("avatar"), updateAvatar)
router.route("/cover-image").patch(verifyJwt, upload.single("coverImage"), updateCoverImage)
router.route("/c/:username").get(verifyJwt, getUserChannelProfile)
router.route("/watch-history").get(verifyJwt, getWatchHistory)
export default router;
