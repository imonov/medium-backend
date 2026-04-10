import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { Protected } from "../middlewares/protected.middleware.js";

export const userRouter = Router();

userRouter.get("/", Protected(true), userController.getAllUsers);
