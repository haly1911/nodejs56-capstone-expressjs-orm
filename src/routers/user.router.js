import express from "express";
import { userController } from "../controllers/user.controller.js";
import { protect } from "../common/middleware/protect.middleware.js";
import { uploadMemory } from "../common/multer/memory-storage.multer.js";

const userRouter = express.Router();

userRouter.use(protect);

userRouter.get("/profile", userController.getProfile);
userRouter.put("/profile", userController.updateProfile);
userRouter.post("/avatar", uploadMemory.single("avatar"), userController.updateAvatar);

export default userRouter;
