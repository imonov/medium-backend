import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { ValidationMiddleware } from "../middlewares/validation.middleware.js";
import { RegisterSchema } from "../schemas/auth/register.schema.js";
import { LoginSchema } from "../schemas/auth/login.schema.js";

export const authRouter = Router();
authRouter
    .post(
        "/signup",
        ValidationMiddleware(RegisterSchema),
        authController.register,
    )
    .post("/signin", ValidationMiddleware(LoginSchema), authController.login)
    .post("/refresh", authController.refresh);
