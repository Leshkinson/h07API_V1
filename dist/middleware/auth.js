"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const query_service_1 = require("../services/query-service");
const token_service_1 = require("../application/token-service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.sendStatus(401);
        return;
    }
    if (req.headers.authorization.split(' ')[0] !== 'Bearer') {
        res.sendStatus(401);
        return;
    }
    const token = req.headers.authorization.split(' ')[1];
    const foo = jsonwebtoken_1.default.decode(token);
    if (!foo) {
        res.sendStatus(401);
        return;
    }
    const tokenService = new token_service_1.TokenService();
    const queryService = new query_service_1.QueryService();
    const payload = yield tokenService.getUserIdByToken(token);
    if (!payload) {
        res.sendStatus(401);
        return;
    }
    const user = yield queryService.findUser(payload.id);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    next();
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map