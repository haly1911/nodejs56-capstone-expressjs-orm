import multer from "multer";
import { BadRequestException } from "../helpers/exception.helper.js";
import { MAX_FILE_SIZE } from "../constants/app.constant.js";

export const handleUpload = (uploadMiddleware) => {
  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(
            new BadRequestException(`Image size exceeds the allowed limit (Maximum ${MAX_FILE_SIZE / 1024 / 1024}MB)`),
          );
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return next(new BadRequestException("Only one file can be uploaded at a time"));
        }
        return next(new BadRequestException(err.message));
      } else if (err) {
        return next(err);
      }
      next();
    });
  };
};
