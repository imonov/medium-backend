import mongoose from "mongoose";

const UserModelSchema = new mongoose.Schema(
    {
        fullname: {
            type: mongoose.SchemaTypes.String,
            minLength: 3,
            required: true,
        },
        age: {
            type: mongoose.SchemaTypes.Number,
            min: 16,
            required: true,
        },
        username: {
            type: mongoose.SchemaTypes.String,
            minLength: 5,
            required: true,
            unique: true,
        },
        password: {
            type: mongoose.SchemaTypes.String,
            minLength: 8,
            required: true,
        },
    },
    {
        collection: "users",
        timestamps: true,
        versionKey: false,
    },
);

export const User = mongoose.model("User", UserModelSchema);
