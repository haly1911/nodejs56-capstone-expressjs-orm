import bcrypt from "bcrypt";
import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException, UnauthorizedException } from "../common/helpers/exception.helper.js";
import { tokenService } from "./token.service.js";

export const authService = {
  async signUp(req) {
    const { email, password, fullName } = req.body;

    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) throw new BadRequestException("Account already exists");

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashPassword,
        full_name: fullName,
      },
    });
    return true;
  },

  async signIn(req) {
    const { email, password } = req.body;

    const existingUser = await prisma.users.findUnique({
      where: { email },
      omit: { password: false },
    });

    if (!existingUser) throw new BadRequestException("Account does not exist");

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) throw new BadRequestException("Invalid username or password");

    const accessToken = tokenService.createAccessToken(existingUser.user_id);
    const refreshToken = tokenService.createRefreshToken(existingUser.user_id);

    return { accessToken, refreshToken };
  },

  async getInfo(req) {
    const user = req.user;
    return user;
  },

  async refreshToken(req) {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) throw new BadRequestException("Please sign in to continue");

    const decodeAccessToken = tokenService.verifyAccessToken(accessToken, {
      ignoreExpiration: true,
    });
    const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken);

    if (decodeAccessToken.userId !== decodeRefreshToken.userId) throw new UnauthorizedException("Invalid token");

    const existingUser = await prisma.users.findUnique({
      where: {
        user_id: decodeAccessToken.userId,
      },
    });

    if (!existingUser) throw new UnauthorizedException("User does not exist");

    const newAccessToken = tokenService.createAccessToken(existingUser.user_id);

    return {
      accessToken: newAccessToken,
      refreshToken,
    };
  },
};
