export const image = {
  "/image": {
    get: {
      tags: ["Image"],
      summary: "Returns a list of images with pagination and filters",
      parameters: [
        {
          in: "query",
          name: "page",
          schema: { type: "integer", example: 1, default: 1 },
        },
        {
          in: "query",
          name: "pageSize",
          schema: { type: "integer", example: 10, default: 10 },
        },
        {
          in: "query",
          name: "filters",
          description: 'JSON string for filtering, e.g. {"image_name": "sunset"}',
          schema: { type: "string", example: '{"image_name": ""}' },
        },
      ],
      responses: { 200: { description: "OK" } },
    },
    post: {
      tags: ["Image"],
      summary: "Upload a new image",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                image: {
                  type: "string",
                  format: "binary",
                  description: "Image file to upload",
                },
                image_name: {
                  type: "string",
                  example: "My Sunset Photo",
                },
                description: {
                  type: "string",
                  example: "A beautiful view of the sunset",
                },
              },
            },
          },
        },
      },
      responses: { 201: { description: "Created" } },
    },
  },
  "/image/created": {
    get: {
      tags: ["Image"],
      summary: "Returns images created by the signed-in user",
      parameters: [
        {
          in: "query",
          name: "page",
          schema: { type: "integer", example: 1, default: 1 },
        },
        {
          in: "query",
          name: "pageSize",
          schema: { type: "integer", example: 10, default: 10 },
        },
      ],
      responses: { 200: { description: "OK" } },
    },
  },
  "/image/{imageId}": {
    get: {
      tags: ["Image"],
      summary: "Returns a single image details by ID",
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
    put: {
      tags: ["Image"],
      summary: "Updates an existing image by ID",
      parameters: [
        {
          in: "path",
          name: "imageId",
          required: true,
          schema: { type: "integer", example: 1 },
        },
      ],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                image: {
                  type: "string",
                  format: "binary",
                  description: "New image file (optional)",
                },
                image_name: {
                  type: "string",
                  example: "Updated Sunset Name",
                },
                description: {
                  type: "string",
                  example: "Updated description",
                },
              },
            },
          },
        },
      },
      responses: { 200: { description: "OK" } },
    },
    delete: {
      tags: ["Image"],
      summary: "Deletes an image by ID",
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
