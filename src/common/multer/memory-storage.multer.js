import multer from "multer";
import { MAX_FILE_SIZE } from "../constants/app.constant.js";

const storage = multer.memoryStorage();
export const uploadMemory = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});
