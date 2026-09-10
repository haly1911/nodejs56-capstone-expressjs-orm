import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../common/helpers/cloudinary.helper.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";

export const imageService = {
  async findAll(req) {
    const { where, page, pageSize, index } = buildQueryPrisma(req);
    const resultPrisma = await prisma.images.findMany({
      where,
      skip: index,
      take: pageSize,
      include: {
        users: { select: { full_name: (u) => u, avatar: true } },
      },
    });
    const totalItems = await prisma.images.count({ where });
    const totalPages = Math.ceil(totalItems / pageSize);
    return {
      items: resultPrisma,
      totalItems,
      totalPages,
      pageSize,
    };
  },

  async findOne(req) {
    const { imageId } = req.params;
    const result = await prisma.images.findUnique({
      where: {
        image_id: Number(imageId),
      },
      include: { users: true },
    });
    if (!result) throw new BadRequestException("Failed to find image");
    return result;
  },

  async create(req) {
    const body = req.body;
    const file = req.file;
    const userId = req.user.user_id;
    let imageUrl = body.url;
    let publicId = null;
    if (file) {
      const uploadResult = await uploadToCloudinary(file.buffer);
      imageUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
    }
    if (!imageUrl) {
      throw new BadRequestException("Please upload file");
    }
    await prisma.images.create({
      data: {
        image_name: body.image_name,
        url: imageUrl,
        public_id: publicId,
        description: body.description,
        user_id: userId,
      },
    });
    return true;
  },

  async update(req) {
    const body = req.body;
    const file = req.file;
    const { imageId } = req.params;
    const existingImage = await prisma.images.findUnique({
      where: { image_id: Number(imageId) },
    });
    if (!existingImage) {
      throw new BadRequestException("Failed to find image to update");
    }
    let imageUrl = body.url || existingImage.url;
    let publicId = existingImage.public_id;
    if (file) {
      const uploadResult = await uploadToCloudinary(file.buffer);
      imageUrl = uploadResult.secure_url;
      await deleteFromCloudinary(existingImage.public_id);
      publicId = uploadResult.public_id;
    }
    await prisma.images.update({
      where: {
        image_id: Number(imageId),
      },
      data: {
        image_name: body.image_name || existingImage.image_name,
        url: imageUrl,
        public_id: publicId,
        description: body.description || existingImage.description,
      },
    });
    return true;
  },

  async remove(req) {
    const { imageId } = req.params;
    await prisma.images.update({
      where: {
        image_id: Number(imageId),
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: 1,
      },
    });
    return true;
  },
};
