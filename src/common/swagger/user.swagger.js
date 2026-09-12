export const user = {
  "/user/profile": {
    get: {
      tags: ["User"],
      summary: "Get current signed-in user profile",
      responses: { 200: { description: "OK" } },
    },
    put: {
      tags: ["User"],
      summary: "Update current user profile information",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                full_name: {
                  type: "string",
                  example: "Nguyen Van A",
                },
                age: {
                  type: "integer",
                  example: 25,
                },
              },
            },
          },
        },
      },
      responses: { 200: { description: "OK" } },
    },
  },
  "/user/change-password": {
    post: {
      tags: ["User"],
      summary: "Change current user password",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                oldPassword: {
                  type: "string",
                  example: "Abc@1234",
                },
                newPassword: {
                  type: "string",
                  example: "Abc@123",
                },
              },
              required: ["oldPassword", "newPassword"],
            },
          },
        },
      },
      responses: { 200: { description: "Password changed successfully. Please sign in again" } },
    },
  },
  "/user/avatar": {
    post: {
      tags: ["User"],
      summary: "Upload or update user avatar image",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                avatar: {
                  type: "string",
                  format: "binary",
                  description: "Avatar image file to upload",
                },
              },
            },
          },
        },
      },
      responses: { 200: { description: "OK" } },
    },
  },
};
