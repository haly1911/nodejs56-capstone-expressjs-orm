import { auth } from "./auth.swagger.js";
import { comment } from "./comment.swagger.js";
import { image } from "./image.swagger.js";
import { savedImage } from "./savedImage.swagger.js";
import { user } from "./user.swagger.js";

export const swaggerDocument = {
  openapi: "3.0.4",
  info: {
    title: "Capstone ExpressJS ORM API",
    description: "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
    version: "0.1.0",
  },

  servers: [
    {
      url: "http://localhost:3069/api",
      description: "Optional server description, e.g. Internal staging server for testing",
    },
    {
      url: "http://api.example.com/v1",
      description: "Optional server description, e.g. Main (production) server",
    },
  ],

  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "accessToken",
      },
    },
  },

  paths: { ...auth, ...image, ...user, ...savedImage, ...comment },
};
