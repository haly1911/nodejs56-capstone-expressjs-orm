import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";

export const savedImageService = {
  async getSavedImages(req) {
    const userId = req.user.user_id;
    const savedList = await prisma.saved_images.findMany({
      where: { user_id: userId },
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });
    return savedList;
  },

  async checkSavedStatus(req) {
    const userId = req.user.user_id;
    const { imageId } = req.params;
    const saved = await prisma.saved_images.findUnique({
      where: {
        user_id_image_id: {
          user_id: userId,
          image_id: Number(imageId),
        },
      },
    });
    return { isSaved: !!saved };
  },

  async toggleSaveImage(req) {
    const userId = req.user.user_id;
    const { imageId } = req.params;
    const image = await prisma.images.findUnique({
      where: { image_id: Number(imageId) },
    });
    if (!image) throw new BadRequestException("Image does not exist");

    const existingSave = await prisma.saved_images.findUnique({
      where: {
        user_id_image_id: {
          user_id: userId,
          image_id: Number(imageId),
        },
      },
    });
    if (existingSave) {
      await prisma.saved_images.delete({
        where: {
          user_id_image_id: {
            user_id: userId,
            image_id: Number(imageId),
          },
        },
      });
      return { isSaved: false, message: "Unsaved image successfully" };
    } else {
      await prisma.saved_images.create({
        data: {
          user_id: userId,
          image_id: Number(imageId),
        },
      });
      return { isSaved: true, message: "Saved image successfully" };
    }
  },
};
