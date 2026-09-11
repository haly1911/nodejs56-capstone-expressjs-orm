export const comment = {
  "/comments/{imageId}": {
    get: {
      tags: ["Comment"],
      summary: "Get a list of comments for a specific image",
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
    post: {
      tags: ["Comment"],
      summary: "Create a new comment on an image",
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
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  example: "This is a wonderful photo!",
                },
              },
            },
          },
        },
      },
      responses: { 201: { description: "Created" } },
    },
  },
  "/comments/{commentId}": {
    put: {
      tags: ["Comment"],
      summary: "Update an existing comment by ID",
      parameters: [
        {
          in: "path",
          name: "commentId",
          required: true,
          schema: { type: "integer", example: 1 },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  example: "Updated comment text here",
                },
              },
            },
          },
        },
      },
      responses: { 200: { description: "OK" } },
    },
    delete: {
      tags: ["Comment"],
      summary: "Delete a comment by ID",
      parameters: [
        {
          in: "path",
          name: "commentId",
          required: true,
          schema: { type: "integer", example: 1 },
        },
      ],
      responses: { 200: { description: "OK" } },
    },
  },
};
