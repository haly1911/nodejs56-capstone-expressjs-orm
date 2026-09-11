export const auth = {
  "/auth/signup": {
    post: {
      tags: ["Auth"],
      summary: "Register a new user account",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "user@gmail.com",
                },
                password: {
                  type: "string",
                  example: "123456",
                },
                fullName: {
                  type: "string",
                  example: "Nguyen Van A",
                },
              },
            },
          },
        },
      },
      responses: { 200: { description: "OK" } },
    },
  },
  "/auth/signin": {
    post: {
      tags: ["Auth"],
      summary: "Sign in with email and password",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "user@gmail.com",
                },
                password: {
                  type: "string",
                  example: "123456",
                },
              },
            },
          },
        },
      },
      responses: { 200: { description: "OK" } },
    },
  },
  "/auth/get-info": {
    get: {
      tags: ["Auth"],
      summary: "Get current logged-in user information",
      responses: { 200: { description: "OK" } },
    },
  },
  "/auth/refresh-token": {
    post: {
      tags: ["Auth"],
      summary: "Refresh access token using cookies",
      responses: { 200: { description: "OK" } },
    },
  },
  "/auth/google": {
    get: {
      tags: ["Auth"],
      summary: "Redirect to Google for OAuth authentication",
      responses: { 302: { description: "Redirect" } },
    },
  },
  "/auth/google/callback": {
    get: {
      tags: ["Auth"],
      summary: "Google OAuth callback handler",
      responses: { 200: { description: "OK" } },
    },
  },
};
