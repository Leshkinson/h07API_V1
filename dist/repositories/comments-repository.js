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
exports.CommentsRepository = void 0;
const comment_model_1 = require("../models/comment-model");
class CommentsRepository {
    constructor() {
        this.commentModel = comment_model_1.CommentModel;
    }
    createComment(content, postId, userId, userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentModel.create({ content, postId, commentatorInfo: { userId, userLogin } });
        });
    }
    updateComment(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentModel.findOneAndUpdate({ _id: id }, {
                content
            });
        });
    }
    getOneComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentModel.findById({ _id: id });
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentModel.findOneAndDelete({ _id: id });
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentModel.deleteMany();
        });
    }
}
exports.CommentsRepository = CommentsRepository;
//# sourceMappingURL=comments-repository.js.map