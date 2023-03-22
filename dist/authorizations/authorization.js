"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuthorization = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const LOGIN = 'admin';
const PASSWORD = 'qwerty';
const TRUEPassword = 'Basic YWRtaW46cXdlcnR5';
const basicAuthorization = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization || authorization !== TRUEPassword) {
        res.sendStatus(401);
        return;
    }
    const encoded = authorization.substring(6);
    const decoded = Buffer.from(encoded, 'base64').toString('ascii');
    const [login, password] = decoded.split(':');
    if (login !== LOGIN || password !== PASSWORD) {
        res.sendStatus(401);
        return;
    }
    next();
};
exports.basicAuthorization = basicAuthorization;
//# sourceMappingURL=authorization.js.map