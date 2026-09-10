import { imageService } from "../services/image.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";
import { statusCodes } from "../common/helpers/statusCode.helper.js";

export const imageController = {
  async findAll(req, res) {
    const result = await imageService.findAll(req, res);
    const response = responseSuccess(result, `Get all images successfully`);
    res.status(response.statusCode).json(response);
  },

  async findOne(req, res) {
    const result = await imageService.findOne(req, res);
    const response = responseSuccess(result, `Get image successfully`);
    res.status(response.statusCode).json(response);
  },

  async create(req, res) {
    const result = await imageService.create(req);
    const response = responseSuccess(result, `Create image successfully`, statusCodes.CREATED);
    res.status(response.statusCode).json(response);
  },

  async update(req, res) {
    const result = await imageService.update(req);
    const response = responseSuccess(result, `Update image successfully`);
    res.status(response.statusCode).json(response);
  },

  async remove(req, res) {
    const result = await imageService.remove(req);
    const response = responseSuccess(result, `Remove image successfully`);
    res.status(response.statusCode).json(response);
  },
};
