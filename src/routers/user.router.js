import express from "express";
import { userController } from "../controllers/user.controller.js";
import { protect } from "../common/middleware/protect.middleware.js";
import { uploadMemory } from "../common/multer/memory-storage.multer.js";
import { handleUpload } from "../common/middleware/uploadFile.middleware.js";

const userRouter = express.Router();

userRouter.use(protect);

userRouter.get("/profile", userController.getProfile);
userRouter.put("/profile", userController.updateProfile);
userRouter.post("/avatar", handleUpload(uploadMemory.single("avatar")), userController.updateAvatar);

export default userRouter;
