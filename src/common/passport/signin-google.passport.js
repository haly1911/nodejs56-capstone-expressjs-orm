import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../constants/app.constant.js";
import { prisma } from "../prisma/connect.prisma.js";
import { tokenService } from "../../services/token.service.js";

export const initSignInGooglePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3069/api/auth/google/callback",
      },
      async function (accessTokenGG, refreshTokenGG, profile, cb) {
        const fullName = profile.displayName;
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const avatar = profile.photos[0].value;
        const isEmailVerified = profile.emails[0].verified;

        if (!isEmailVerified) {
          return cb(new Error("Email is not verified"), null);
        }

        let existingUser = await prisma.users.findFirst({
          where: {
            email,
          },
        });

        if (!existingUser) {
          existingUser = await prisma.users.create({
            data: {
              full_name: fullName,
              googleId,
              email,
              avatar,
            },
          });
        }

        const accessToken = tokenService.createAccessToken(existingUser.user_id);
        const refreshToken = tokenService.createRefreshToken(existingUser.user_id);

        return cb(null, { accessToken, refreshToken });
      },
    ),
  );
};
