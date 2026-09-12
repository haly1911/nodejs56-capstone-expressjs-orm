import "dotenv/config";

export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
export const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
export const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const MAX_FILE_SIZE = 2 * 1024 * 1024;

console.log(
  "\n",
  {
    "PORT:": PORT,
    "DATABASE_URL:": DATABASE_URL,
    "ACCESS_TOKEN_SECRET_KEY:": ACCESS_TOKEN_SECRET_KEY,
    "REFRESH_TOKEN_SECRET_KEY:": REFRESH_TOKEN_SECRET_KEY,
    "GOOGLE_CLIENT_ID:": GOOGLE_CLIENT_ID,
    "GOOGLE_CLIENT_SECRET:": GOOGLE_CLIENT_SECRET,
  },
  "\n",
);
