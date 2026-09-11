import express from "express";
import rootRouter from "./src/routers/root.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logApi } from "./src/common/middleware/log-api.middleware.js";
import { appLimit } from "./src/common/middleware/rateLimit.middleware.js";
import { appError } from "./src/common/helpers/appError.helper.js";
import { initSignInGooglePassport } from "./src/common/passport/signin-google.passport.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(logApi());

initSignInGooglePassport();

app.use("/api", appLimit, rootRouter);
app.use(appError);

const PORT = 3069;
app.listen(PORT, () => {
  console.log(`server online at localhost:${PORT}`);
});
