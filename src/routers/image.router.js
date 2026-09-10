import express from "express";
import { imageController } from "../controllers/image.controller.js";
import { uploadMemory } from "../common/multer/memory-storage.multer.js";

const imageRouter = express.Router();

imageRouter.get("/", imageController.findAll);
imageRouter.get("/:imageId", imageController.findOne);
imageRouter.post("/", uploadMemory.single("image"), imageController.create);
imageRouter.put("/:imageId", uploadMemory.single("image"), imageController.update);
imageRouter.delete("/:imageId", imageController.remove);

export default imageRouter;
