import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../common/helpers/cloudinary.helper.js";

export const userService = {
  async getProfile(req) {
    const userId = req.user.user_id;
    const user = await prisma.users.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        email: true,
        full_name: true,
        age: true,
        avatar: true,
      },
    });

    if (!user) throw new BadRequestException("User does not exist");

    return user;
  },

  async updateProfile(req) {
    const userId = req.user.user_id;
    const { full_name, age } = req.body;
    const updatedUser = await prisma.users.update({
      where: { user_id: userId },
      data: {
        full_name,
        age: Number(age),
      },
      select: {
        user_id: true,
        email: true,
        full_name: true,
        age: true,
        avatar: true,
      },
    });
    return updatedUser;
  },

  async updateAvatar(req) {
    const file = req.file;
    if (!file) throw new BadRequestException("Please select an image file to upload");

    const userId = req.user.user_id;
    const currentUser = await prisma.users.findUnique({ where: { user_id: userId } });
    const uploadResult = await uploadToCloudinary(file.buffer);
    if (currentUser && currentUser.avatar_public_id) {
      await deleteFromCloudinary(currentUser.avatar_public_id);
    }

    await prisma.users.update({
      where: { user_id: userId },
      data: {
        avatar: uploadResult.secure_url,
        avatar_public_id: uploadResult.public_id,
      },
    });
    return { avatar: uploadResult.secure_url };
  },
};
