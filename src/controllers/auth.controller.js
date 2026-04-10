import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtConfig from "../configs/jwt.config.js";
import { NotFoundException } from "../exceptions/not_found.exception.js";
import { ConflictException } from "../exceptions/conflict.exception.js";
// import { randomInt } from "node:crypto";
// import nodemailer from "nodemailer";
// import emailConfig from "../configs/otp.config.js";

class AuthController {
    #_userModel;
    constructor() {
        this.#_userModel = User;
    }

    // register
    register = async (req, res, next) => {
        try {
            const { fullname, age, username, password } = req.body;

            const existingUser = await this.#_userModel.findOne({ username });
            if (existingUser) {
                throw new ConflictException("foydalanuvchi nomi band");
            }
            const hashedPassword = await this.#_hashPassword(password);
            const newUser = await this.#_userModel.create({
                fullname,
                age,
                username,
                password: hashedPassword,
            });

            const token = await this.#_generateToken({ id: newUser._id });
            // const otp = randomInt(1000, 9999);
            // await this.#_sendOtp(username, otp);

            res.status(201).json({
                success: true,
                message: "foydalanuvchi yaratildi",
                data: { token },
            });
        } catch (error) {
            next(error);
        }
    };

    // login
    login = async (req, res, next) => {
        try {
            const { username, password } = req.body;

            const existingUser = await this.#_userModel.findOne({ username });

            if (!existingUser) {
                throw new NotFoundException("Foydalanuvchi topilmadi");
            }

            const isSamePassword = await this.#_comparePassword(
                password,
                existingUser.password,
            );

            if (!isSamePassword) {
                throw new ConflictException("parol xato");
            }

            const token = await this.#_generateToken({ id: existingUser._id });
            // console.log(token);
            res.status(200).json({
                success: true,
                data: { token },
            });
        } catch (error) {
            next(error);
        }
    };

    // hash password
    #_hashPassword = async (password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    };

    // check password
    #_comparePassword = (originalPassword, hashedPassword) => {
        const isSame = bcrypt.compare(originalPassword, hashedPassword);
        return isSame;
    };

    // generate token
    #_generateToken = async (payload) => {
        const token = jwt.sign({ payload }, jwtConfig.SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: jwtConfig.EXPIRE_TIME,
        });

        return token;
    };

    //     #_sendOtp = async (email, otp) => {
    //         const transporter = nodemailer.createTransport({
    //             host: emailConfig.SMTP_SERVER,
    //             port: emailConfig.SMTP_PORT,
    //             secure: true,
    //             auth: {
    //                 user: emailConfig.USER,
    //                 pass: emailConfig.PASS,
    //             },
    //         });

    //         try {
    //             const info = await transporter.sendMail({
    //                 from: `"No-reply" <${emailConfig.USER}>`,
    //                 to: email,
    //                 subject: "Emailni tasdiqlash",
    //                 html: `<h3>Sizning tasdiqlash kodingiz:</h3><br/><i><b>${otp}</b></i>`,
    //             });

    //             console.log(`otp yuborildi:\n${info.response}`);
    //         } catch (error) {
    //             console.log(`otp yuborishda xatolik\n${error}`);
    //         }
    //     };
}

export default new AuthController();
