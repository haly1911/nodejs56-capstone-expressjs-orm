import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException, UnauthorizedException } from "../common/helpers/exception.helper.js";

export const commentService = {
  async getCommentsByImage(req) {
    const { imageId } = req.params;
    const comments = await prisma.comments.findMany({
      where: { image_id: Number(imageId) },
      include: {
        users: {
          select: {
            user_id: true,
            full_name: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return comments;
  },

  async createComment(req) {
    const userId = req.user.user_id;
    const { imageId } = req.params;
    const { content } = req.body;

    const image = await prisma.images.findUnique({
      where: { image_id: Number(imageId) },
    });
    if (!image) throw new BadRequestException("Image does not exist");

    const newComment = await prisma.comments.create({
      data: {
        user_id: userId,
        image_id: Number(imageId),
        content,
      },
      include: {
        users: {
          select: {
            user_id: true,
            full_name: true,
            avatar: true,
          },
        },
      },
    });
    return newComment;
  },

  async updateComment(req) {
    const userId = req.user.user_id;
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await prisma.comments.findUnique({
      where: { comment_id: Number(commentId) },
    });
    if (!comment) throw new BadRequestException("Comment does not exist");
    if (comment.user_id !== userId) throw new UnauthorizedException("You do not have permission to edit this comment");

    const updatedComment = await prisma.comments.update({
      where: { comment_id: Number(commentId) },
      data: {
        content,
        updatedAt: new Date(),
      },
    });
    return updatedComment;
  },

  async deleteComment(req) {
    const userId = req.user.user_id;
    const { commentId } = req.params;

    const comment = await prisma.comments.findUnique({
      where: { comment_id: Number(commentId) },
    });
    if (!comment) throw new BadRequestException("Comment does not exist");
    if (comment.user_id !== userId)
      throw new UnauthorizedException("You do not have permission to delete this comment");

    await prisma.comments.update({
      where: { comment_id: Number(commentId) },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: 1,
      },
    });
    return true;
  },
};
