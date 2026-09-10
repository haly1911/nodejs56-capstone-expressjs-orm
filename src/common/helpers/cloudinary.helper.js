import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ secure: false });

export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "capstone_expressjs_orm" }, (error, result) => {
      result ? resolve(result) : reject(error);
    });
    stream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Failed to delete image on Cloudinary:", error);
  }
};
