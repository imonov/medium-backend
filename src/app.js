import express from "express";
import cors from "cors";
import appConfig from "./configs/app.config.js";
import { apiRouter } from "./routes/index.js";
import { connectDb } from "./configs/db.config.js";
import { ErrorHandlerMiddleware } from "./middlewares/error_handler.middleware.js";

const app = express();
app.use(express.json());
app.use(cors());

await connectDb();

app.use("/api", apiRouter);

app.use(ErrorHandlerMiddleware);

app.listen(appConfig.PORT, () => {
    console.log(
        `Server ishlayotgan manzil: http://localhost:${appConfig.PORT}`,
    );
});
