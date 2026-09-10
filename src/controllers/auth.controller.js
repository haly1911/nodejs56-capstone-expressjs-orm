import { authService } from "../services/auth.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const authController = {
  async signUp(req, res, next) {
    const result = await authService.signUp(req);
    const response = responseSuccess(result, `Sign up successfully`);
    res.status(response.statusCode).json(response);
  },

  async signIn(req, res, next) {
    const result = await authService.signIn(req);
    const response = responseSuccess(result, `Sign in successfully`);
    res.cookie("accessToken", result.accessToken);
    res.cookie("refreshToken", result.refreshToken);
    res.status(response.statusCode).json(response);
  },

  async getInfo(req, res, next) {
    const result = await authService.getInfo(req);
    const response = responseSuccess(true, "Get info successfully");
    res.status(response.statusCode).json(response);
  },

  async refreshToken(req, res, next) {
    const result = await authService.refreshToken(req);
    const response = responseSuccess(result, `Refresh token successfully`);
    res.cookie("accessToken", result.accessToken);
    res.cookie("refreshToken", result.refreshToken);
    res.status(response.statusCode).json(response);
  },
};
