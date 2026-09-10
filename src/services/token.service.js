import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from "../common/constants/app.constant.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";

export const tokenService = {
  createAccessToken(userId) {
    if (!userId) throw new BadRequestException("There is no userID to generate an access token");

    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });

    return accessToken;
  },

  createRefreshToken(userId) {
    if (!userId) throw new BadRequestException("There is no userID to generate an refresh token");

    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "7d",
    });

    return refreshToken;
  },

  verifyAccessToken(accessToken, option) {
    const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY, option);
    return decode;
  },

  verifyRefreshToken(refreshToken, option) {
    const decode = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY, option);
    return decode;
  },
};
