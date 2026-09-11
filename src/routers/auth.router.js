import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { signInLimit } from "../common/middleware/rateLimit.middleware.js";
import { protect } from "../common/middleware/protect.middleware.js";
import passport from "passport";

const authRouter = express.Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", signInLimit, authController.signIn);
authRouter.get("/get-info", protect, authController.getInfo);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin", session: false }),
  authController.googleCallback,
);

export default authRouter;
