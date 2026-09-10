import { tokenService } from "../../services/token.service.js";
import { BadRequestException } from "../helpers/exception.helper.js";
import { prisma } from "../prisma/connect.prisma.js";

export const protect = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) throw new BadRequestException("Access token not found");

  const decode = tokenService.verifyAccessToken(accessToken);
  const existingUser = await prisma.users.findUnique({
    where: {
      user_id: decode.userId,
    },
  });

  if (!existingUser) throw new BadRequestException("User does not exist");

  req.user = existingUser;
  next();
};
