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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user-service");
const query_service_1 = require("../services/query-service");
//import jwt from "jsonwebtoken"
const token_service_1 = require("../application/token-service");
const token_mapper_1 = require("../dto/mappers/token-mapper");
class UserController {
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userService = new user_service_1.UserService();
                const queryService = new query_service_1.QueryService();
                let { sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm } = req.query;
                pageNumber = Number(pageNumber !== null && pageNumber !== void 0 ? pageNumber : 1);
                pageSize = Number(pageSize !== null && pageSize !== void 0 ? pageSize : 10);
                const users = yield userService.getAll(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm);
                const totalCount = yield queryService.getTotalCountForUsers(searchLoginTerm, searchEmailTerm);
                res.status(200).json({
                    "pagesCount": Math.ceil(totalCount / pageSize),
                    "page": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalCount,
                    "items": users,
                });
            }
            catch (error) {
                if (error instanceof Error)
                    throw new Error(error.message);
            }
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userService = new user_service_1.UserService();
                const { login, password, email } = req.body;
                const newUser = yield userService.create(login, password, email);
                res.status(201).json(newUser);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userService = new user_service_1.UserService();
                const { id } = req.params;
                yield userService.delete(id);
                res.sendStatus(204);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.sendStatus(404);
                    console.log(error.message);
                }
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userService = new user_service_1.UserService();
                const tokenService = new token_service_1.TokenService();
                const { loginOrEmail, password } = req.body;
                const user = yield userService.verifyUser(loginOrEmail, password);
                if (user) {
                    const token = tokenService.generateToken(token_mapper_1.TokenMapper.prepareModel(user));
                    res.status(200).json({
                        "accessToken": token
                    });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.sendStatus(401);
                    console.log(error.message);
                }
            }
        });
    }
    static me(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenService = new token_service_1.TokenService();
                const queryService = new query_service_1.QueryService();
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                console.log('Token', token);
                if (token) {
                    const payload = yield tokenService.getUserIdByToken(token);
                    console.log('userId', payload);
                    const user = yield queryService.findUser(payload.id);
                    res.status(200).json({
                        "email": user === null || user === void 0 ? void 0 : user.email,
                        "login": user === null || user === void 0 ? void 0 : user.login,
                        "userId": payload.id
                    });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.sendStatus(401);
                    console.log(error.message);
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user-controller.js.map