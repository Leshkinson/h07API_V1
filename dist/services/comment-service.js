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
exports.CommentService = void 0;
const comments_repository_1 = require("../repositories/comments-repository");
class CommentService {
    constructor() {
        this.commentRepository = new comments_repository_1.CommentsRepository();
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.commentRepository.getOneComment(id);
            if (!comment)
                throw new Error();
            return comment;
        });
    }
    update(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateComment = yield this.commentRepository.updateComment(id, content);
            if (updateComment)
                return updateComment;
            throw new Error();
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findComment = yield this.find(id);
            if (findComment)
                return findComment;
            throw new Error();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteComment = yield this.commentRepository.deleteComment(id);
            if (deleteComment)
                return deleteComment;
            throw new Error();
        });
    }
    testingDelete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.commentRepository.deleteAll();
        });
    }
}
exports.CommentService = CommentService;
//# sourceMappingURL=comment-service.js.map