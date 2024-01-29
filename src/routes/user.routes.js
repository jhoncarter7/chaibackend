import { Router } from "express";
import { refreshAccessToken, registerUser, userLogOut, userLogin } from "../controllers/user.controller.js";
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
export default router;
