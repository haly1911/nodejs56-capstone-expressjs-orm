import express from "express";
import { commentController } from "../controllers/comment.controller.js";
import { protect } from "../common/middleware/protect.middleware.js";

const commentRouter = express.Router();

commentRouter.get("/:imageId", commentController.getCommentsByImage);
commentRouter.post("/:imageId", protect, commentController.createComment);
commentRouter.put("/:commentId", protect, commentController.updateComment);
commentRouter.delete("/:commentId", protect, commentController.deleteComment);

export default commentRouter;
