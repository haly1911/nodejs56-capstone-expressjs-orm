import express from "express";
import { imageController } from "../controllers/image.controller.js";
import { uploadMemory } from "../common/multer/memory-storage.multer.js";
import { protect } from "../common/middleware/protect.middleware.js";

const imageRouter = express.Router();

imageRouter.get("/", imageController.findAll);
imageRouter.get("/:imageId", imageController.findOne);
imageRouter.post("/", protect, uploadMemory.single("image"), imageController.create);
imageRouter.put("/:imageId", protect, uploadMemory.single("image"), imageController.update);
imageRouter.delete("/:imageId", protect, imageController.remove);

export default imageRouter;
