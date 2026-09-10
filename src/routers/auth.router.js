import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { signInLimit } from "../common/middleware/rateLimit.middleware.js";
import { protect } from "../common/middleware/protect.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", signInLimit, authController.signIn);
authRouter.get("/get-info", protect, authController.getInfo);
authRouter.post("/refresh-token", authController.refreshToken);

export default authRouter;
