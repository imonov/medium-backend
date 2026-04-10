import { config } from "dotenv";

config({ quiet: true });

export default {
    PORT: process.env.APP_PORT,
};
