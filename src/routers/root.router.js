import express from "express";
import imageRouter from "./image.router.js";
import authRouter from "./auth.router.js";

const rootRouter = express.Router();

rootRouter.use("/image", imageRouter);
rootRouter.use("/auth", authRouter);

export default rootRouter;
