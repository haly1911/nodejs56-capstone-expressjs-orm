import { responseSuccess } from "../common/helpers/response.helper.js";
import { savedImageService } from "../services/savedImage.service.js";

export const savedImageController = {
  async getSavedImages(req, res, next) {
    const result = await savedImageService.getSavedImages(req);
    const response = responseSuccess(result, `Get saved images successfully`);
    res.status(response.statusCode).json(response);
  },

  async checkSavedStatus(req, res, next) {
    const result = await savedImageService.checkSavedStatus(req);
    const response = responseSuccess(result, `Check saved status successfully`);
    res.status(response.statusCode).json(response);
  },

  async toggleSaveImage(req, res, next) {
    const result = await savedImageService.toggleSaveImage(req);
    const response = responseSuccess(result, result.message);
    res.status(response.statusCode).json(response);
  },
};
