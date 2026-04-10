import { BadRequestException } from "../exceptions/bad_request.exception.js";

export const ValidationMiddleware = (schema, target = "body") => {
    const ALLOWED_TARGETS = ["body", "params", "query"];

    if (!ALLOWED_TARGETS.includes(target)) {
        throw new Error(
            `target quyidagilardan biri emas: \n ${ALLOWED_TARGETS}`,
        );
    }

    return (req, res, next) => {
        const { error, value } = schema.validate(req[target]);

        if (error) {
            throw new BadRequestException(error.message);
        }

        req[target] = value;
        next();
    };
};
