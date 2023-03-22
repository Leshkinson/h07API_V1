"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings = {
    JWT_ACCESS_SECRET: "superpupersecret",
    TOKEN_LIVE_TIME: { expiresIn: "14h" }
};
class TokenService {
    constructor() {
        this.options = settings.TOKEN_LIVE_TIME;
        this.secret = settings.JWT_ACCESS_SECRET;
    }
    generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secret, this.options);
    }
    getUserIdByToken(token) {
        return jsonwebtoken_1.default.verify(token, settings.JWT_ACCESS_SECRET);
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token-service.js.map