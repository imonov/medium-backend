import { config } from "dotenv";

config({ quiet: true });

export default {
    SECRET_KEY: process.env.SECRET_KEY,
    EXPIRE_TIME: process.env.EXPIRE_TIME
        ? Number(process.env.EXPIRE_TIME)
        : 300,

    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
    REFRESH_EXPIRE_TIME: process.env.REFRESH_EXPIRE_TIME,
};
