import { responseSuccess } from "../common/helpers/response.helper.js";
import { commentService } from "../services/comment.service.js";
import { statusCodes } from "../common/helpers/statusCode.helper.js";

export const commentController = {
  async getCommentsByImage(req, res, next) {
    const result = await commentService.getCommentsByImage(req);
    const response = responseSuccess(result, `Get comments successfully`);
    res.status(response.statusCode).json(response);
  },

  async createComment(req, res, next) {
    const result = await commentService.createComment(req);
    const response = responseSuccess(result, `Create comment successfully`, statusCodes.CREATED);
    res.status(response.statusCode).json(response);
  },

  async updateComment(req, res, next) {
    const result = await commentService.updateComment(req);
    const response = responseSuccess(result, `Update comment successfully`);
    res.status(response.statusCode).json(response);
  },

  async deleteComment(req, res, next) {
    const result = await commentService.deleteComment(req);
    const response = responseSuccess(result, `Delete comment successfully`);
    res.status(response.statusCode).json(response);
  },
};
