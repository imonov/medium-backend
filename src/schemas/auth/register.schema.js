import Joi from "joi";

export const RegisterSchema = new Joi.object({
    fullname: Joi.string().min(3).required(),
    age: Joi.number().integer().min(16).required(),
    username: Joi.string().min(6).required(),
    password: Joi.string().alphanum().min(8).required(),
});
