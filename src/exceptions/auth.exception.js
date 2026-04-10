import { BaseException } from "./base.exception.js";

export class AuthException extends BaseException {
    constructor(message) {
        super(message);
        this.status = 401;
        this.name = "Authorization Exception";
    }
}
