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
exports.UsersRepository = void 0;
const user_model_1 = require("../models/user-model");
class UsersRepository {
    constructor() {
        this.userModel = user_model_1.UserModel;
    }
    getAllUsers(sortBy = 'createdAt', sortDirection = 'desc', skip = 0, limit = 10, searchLoginTerm = {}, searchEmailTerm = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.find({ $or: [searchLoginTerm, searchEmailTerm] }).sort({ [sortBy]: sortDirection }).skip(skip).limit(limit);
        });
    }
    findUser(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne({ $or: [{ "login": loginOrEmail }, { "email": loginOrEmail }] });
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findById({ _id: id });
        });
    }
    getUsersCount(searchLoginTerm = {}, searchEmailTerm = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.countDocuments({ $or: [searchLoginTerm, searchEmailTerm] });
        });
    }
    createUser(login, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.create({ login, password, email });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOneAndDelete({ _id: id });
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.deleteMany();
        });
    }
}
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users-repository.js.map