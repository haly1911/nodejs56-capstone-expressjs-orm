export const savedImage = {
  "/saved-images": {
    get: {
      tags: ["Saved Image"],
      summary: "Get a list of images saved by the signed-in user",
      responses: { 200: { description: "OK" } },
    },
  },
  "/saved-images/check/{imageId}": {
    get: {
      tags: ["Saved Image"],
      summary: "Check whether a specific image is saved by the user",
      parameters: [
        {
          in: "path",
          name: "imageId",
          required: true,
          schema: { type: "integer", example: 1 },
        },
      ],
      responses: { 200: { description: "OK" } },
    },
  },
  "/saved-images/{imageId}": {
    post: {
      tags: ["Saved Image"],
      summary: "Toggle save or unsave status for an image",
      parameters: [
        {
          in: "path",
          name: "imageId",
          required: true,
          schema: { type: "integer", example: 1 },
        },
      ],
      responses: { 200: { description: "OK" } },
    },
  },
};
