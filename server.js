import express from "express";
import rootRouter from "./src/routers/root.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logApi } from "./src/common/middleware/log-api.middleware.js";
import { appLimit } from "./src/common/middleware/rateLimit.middleware.js";
import { appError } from "./src/common/helpers/appError.helper.js";
import { initSignInGooglePassport } from "./src/common/passport/signin-google.passport.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./src/common/swagger/init.swagger.js";
import { PORT } from "./src/common/constants/app.constant.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(logApi());

initSignInGooglePassport();

app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", appLimit, rootRouter);
app.use(appError);

app.listen(PORT, () => {
  console.log(`server online at localhost:${PORT}`);
});
