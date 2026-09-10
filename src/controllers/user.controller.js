import { userService } from "../services/user.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const userController = {
  async getProfile(req, res, next) {
    const result = await userService.getProfile(req);
    const response = responseSuccess(result, `Get user profile successfully`);
    res.status(response.statusCode).json(response);
  },

  async updateProfile(req, res, next) {
    const result = await userService.updateProfile(req);
    const response = responseSuccess(result, `Update profile successfully`);
    res.status(response.statusCode).json(response);
  },

  async updateAvatar(req, res, next) {
    const result = await userService.updateAvatar(req);
    const response = responseSuccess(result, `Update avatar successfully`);
    res.status(response.statusCode).json(response);
  },
};
