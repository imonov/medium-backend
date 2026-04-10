import { config } from "dotenv";

config({ quiet: true });

export default {
    USER: process.env.EMAIL,
    PASS: process.env.PASS,
    SMTP_SERVER: process.env.SMTP_SERVER,
    SMTP_PORT: process.env.SMTP_PORT,
};
