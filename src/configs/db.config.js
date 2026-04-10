import { config } from "dotenv";
import mongoose from "mongoose";

config({ quiet: true });

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
    console.log(`mongo url mavjud emas`);
    process.exit(1);
}

export const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log(`dbga ulandi `);
    } catch (error) {
        console.log(`dbga ulanishda xatolik: \n${error}`);
    }
};
