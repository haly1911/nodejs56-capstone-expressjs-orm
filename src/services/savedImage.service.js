import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";

export const savedImageService = {
  async getSavedImages(req) {
    const userId = req.user.user_id;
    const { where, page, pageSize, index } = buildQueryPrisma(req);
    const resultPrisma = await prisma.saved_images.findMany({
      where: {
        user_id: userId,
        images: {
          isDeleted: false,
        },
      },
      skip: index,
      take: pageSize,
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    const totalItems = await prisma.saved_images.count({ where: { user_id: userId, images: { isDeleted: false } } });
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      items: resultPrisma,
      totalItems,
      totalPages,
      pageSize,
    };
  },

  async checkSavedStatus(req) {
    const userId = req.user.user_id;
    const { imageId } = req.params;
    const image = await prisma.images.findUnique({
      where: { image_id: Number(imageId) },
    });
    if (!image || image.isDeleted) {
      throw new BadRequestException("Image does not exist or has been deleted");
    }
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
    if (!image || image.isDeleted) {
      throw new BadRequestException("Image does not exist or has been deleted");
    }

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
