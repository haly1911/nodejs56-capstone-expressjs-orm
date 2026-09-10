import { imageService } from "../services/image.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";
import { statusCodes } from "../common/helpers/statusCode.helper.js";

export const imageController = {
  async getImageList(req, res) {
    const result = await imageService.getListImage(req, res);
    const response = responseSuccess(result, `Get all images successfully`);
    res.status(response.statusCode).json(response);
  },

  async getImagesByUser(req, res) {
    const result = await imageService.getImagesByUser(req, res);
    const response = responseSuccess(result, `Get images created by user successfully`);
    res.status(response.statusCode).json(response);
  },

  async getImageDetails(req, res) {
    const result = await imageService.getImageDetails(req, res);
    const response = responseSuccess(result, `Get image successfully`);
    res.status(response.statusCode).json(response);
  },

  async createImage(req, res) {
    const result = await imageService.createImage(req);
    const response = responseSuccess(result, `Create image successfully`, statusCodes.CREATED);
    res.status(response.statusCode).json(response);
  },

  async updateImage(req, res) {
    const result = await imageService.updateImage(req);
    const response = responseSuccess(result, `Update image successfully`);
    res.status(response.statusCode).json(response);
  },

  async deleteImage(req, res) {
    const result = await imageService.deleteImage(req);
    const response = responseSuccess(result, `Delete image successfully`);
    res.status(response.statusCode).json(response);
  },
};
