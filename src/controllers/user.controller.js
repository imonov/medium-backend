import { User } from "../models/user.model.js";

class UserController {
    #_userModel;

    constructor() {
        this.#_userModel = User;
    }

    getAllUsers = async (req, res) => {
        const users = await this.#_userModel.find();

        res.status(200).json({
            success: true,
            data: { users },
        });
    };
}

export default new UserController();
