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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_repository_1 = require("../repositories/users-repository");
class UserService {
    constructor() {
        this.userRepository = new users_repository_1.UsersRepository();
    }
    getAll(sortBy = 'createdAt', sortDirection = 'desc', pageNumber = 1, pageSize = 10, searchLoginTerm = {}, searchEmailTerm = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (searchLoginTerm)
                searchLoginTerm = { login: { $regex: new RegExp(`.*${searchLoginTerm}.*`, 'i') } };
            if (searchEmailTerm)
                searchEmailTerm = { email: { $regex: new RegExp(`.*${searchEmailTerm}.*`, 'i') } };
            const skip = Number((pageNumber - 1) * pageSize);
            return yield this.userRepository.getAllUsers(sortBy, sortDirection, skip, pageSize, searchLoginTerm, searchEmailTerm);
        });
    }
    create(login, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield bcrypt_1.default.hash(password, 5);
            return yield this.userRepository.createUser(login, hashPassword, email);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteUser = yield this.userRepository.deleteUser(id);
            if (deleteUser)
                return deleteUser;
            throw new Error();
        });
    }
    testingDelete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.deleteAll();
        });
    }
    verifyUser(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const consideredUser = yield this.userRepository.findUser(loginOrEmail);
            if (!consideredUser)
                throw new Error();
            if (yield bcrypt_1.default.compare(password, consideredUser.password))
                return consideredUser;
            throw new Error();
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map