import rateLimit from "express-rate-limit";
import { TooManyRequestsException } from "../helpers/exception.helper.js";

export const appLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: () => {
    throw new TooManyRequestsException();
  },
});

export const signInLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: () => {
    throw new TooManyRequestsException("Too many failed sign in attempts. Please try again later");
  },
});
