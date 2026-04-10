import jwt from "jsonwebtoken";
import jwtConfig from "../configs/jwt.config.js";
import { BadRequestException } from "../exceptions/bad_request.exception.js";
import { AuthException } from "../exceptions/auth.exception.js";

export const Protected = (isProtected = true) => {
    return (req, res, next) => {
        if (!isProtected) return next();

        const { authorization } = req.headers;

        if (!authorization) {
            throw new BadRequestException("Token mavjud emas");
        }

        const token = authorization?.split(" ")[1];

        try {
            const payload = jwt.verify(token, jwtConfig.SECRET_KEY);

            req.user = payload;

            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new AuthException("token eskirgan");
            }

            if (error instanceof jwt.JsonWebTokenError) {
                throw new BadRequestException("Token xato");
            }

            next(error);
        }
    };
};
