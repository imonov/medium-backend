import { Router } from "express";
import { authRouter } from "./auth.router.js";
import { userRouter } from "./user.router.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
