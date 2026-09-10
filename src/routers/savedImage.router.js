import express from "express";
import { savedImageController } from "../controllers/savedImage.controller.js";
import { protect } from "../common/middleware/protect.middleware.js";

const savedImageRouter = express.Router();

savedImageRouter.use(protect);

savedImageRouter.get("/", savedImageController.getSavedImages);
savedImageRouter.get("/check/:imageId", savedImageController.checkSavedStatus);
savedImageRouter.post("/:imageId", savedImageController.toggleSaveImage);

export default savedImageRouter;
