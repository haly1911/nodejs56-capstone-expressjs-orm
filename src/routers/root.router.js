import express from "express";
import imageRouter from "./image.router.js";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import savedImageRouter from "./savedImage.router.js";
import commentRouter from "./comment.router.js";

const rootRouter = express.Router();

rootRouter.use("/image", imageRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/saved-images", savedImageRouter);
rootRouter.use("/comments", commentRouter);

export default rootRouter;
