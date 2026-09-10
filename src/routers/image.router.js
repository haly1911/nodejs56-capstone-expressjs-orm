import express from "express";
import { imageController } from "../controllers/image.controller.js";
import { uploadMemory } from "../common/multer/memory-storage.multer.js";
import { protect } from "../common/middleware/protect.middleware.js";

const imageRouter = express.Router();

imageRouter.get("/", imageController.getImageList);
imageRouter.get("/created", protect, imageController.getImagesByUser);
imageRouter.get("/:imageId", imageController.getImageDetails);
imageRouter.post("/", protect, uploadMemory.single("image"), imageController.createImage);
imageRouter.put("/:imageId", protect, uploadMemory.single("image"), imageController.updateImage);
imageRouter.delete("/:imageId", protect, imageController.deleteImage);

export default imageRouter;
