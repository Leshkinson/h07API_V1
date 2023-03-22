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
exports.CommentController = void 0;
const comment_service_1 = require("../services/comment-service");
const token_service_1 = require("../application/token-service");
const query_service_1 = require("../services/query-service");
// import {CustomError} from "../middleware/catch-error";
class CommentController {
    static updateComment(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentService = new comment_service_1.CommentService();
                const tokenService = new token_service_1.TokenService();
                const queryService = new query_service_1.QueryService();
                const { commentId } = req.params;
                const { content } = req.body;
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (token) {
                    const payload = yield tokenService.getUserIdByToken(token);
                    const user = yield queryService.findUser(payload.id);
                    if (!user) {
                        res.sendStatus(404);
                        return;
                    }
                    const comment = yield commentService.getOne(commentId);
                    if (!comment) {
                        res.sendStatus(404);
                        return;
                    }
                    if ((comment === null || comment === void 0 ? void 0 : comment.commentatorInfo.userLogin) !== (user === null || user === void 0 ? void 0 : user.login)) {
                        console.log('Here1');
                        res.sendStatus(403);
                        return;
                    }
                    if ((comment === null || comment === void 0 ? void 0 : comment.commentatorInfo.userId) !== (user === null || user === void 0 ? void 0 : user._id.toString())) {
                        console.log('Here2');
                        res.sendStatus(403);
                        return;
                    }
                    const updatedComment = yield commentService.update(commentId, content);
                    if (updatedComment)
                        res.sendStatus(204);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.sendStatus(404);
                    console.log(error.message);
                }
            }
        });
    }
    static deleteComment(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentService = new comment_service_1.CommentService();
                const tokenService = new token_service_1.TokenService();
                const queryService = new query_service_1.QueryService();
                const { id } = req.params;
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (token) {
                    const payload = yield tokenService.getUserIdByToken(token);
                    const user = yield queryService.findUser(payload.id);
                    if (!user) {
                        res.sendStatus(404);
                        return;
                    }
                    const comment = yield commentService.getOne(id);
                    if (!comment) {
                        res.sendStatus(404);
                        return;
                    }
                    console.log('comment?.commentatorInfo.userLogin', comment === null || comment === void 0 ? void 0 : comment.commentatorInfo.userLogin);
                    console.log('user?.login', user === null || user === void 0 ? void 0 : user.login);
                    console.log('comment?.commentatorInfo.userLogin', comment === null || comment === void 0 ? void 0 : comment.commentatorInfo.userLogin);
                    console.log('user?.email', user === null || user === void 0 ? void 0 : user.email);
                    if ((comment === null || comment === void 0 ? void 0 : comment.commentatorInfo.userLogin) !== (user === null || user === void 0 ? void 0 : user.login)) {
                        console.log('Here3');
                        res.sendStatus(403);
                        return;
                    }
                    if ((comment === null || comment === void 0 ? void 0 : comment.commentatorInfo.userId) !== (user === null || user === void 0 ? void 0 : user._id.toString())) {
                        console.log('Here4');
                        res.sendStatus(403);
                        return;
                    }
                    yield commentService.delete(id);
                    res.sendStatus(204);
                }
            }
            catch (error) {
                // if (error instanceof CustomError){
                //     res.sendStatus(error.code);
                //     console.log('CustomError', error.code);
                // } else
                if (error instanceof Error) {
                    res.sendStatus(404);
                    console.log(error.message);
                }
            }
        });
    }
    static getOneComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentService = new comment_service_1.CommentService();
                const { id } = req.params;
                const findComment = yield commentService.getOne(id);
                res.status(200).json(findComment);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.sendStatus(404);
                    console.log(error.message);
                }
            }
        });
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=comment-controller.js.map