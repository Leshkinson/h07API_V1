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
exports.TestController = void 0;
const blog_service_1 = require("../services/blog-service");
const post_service_1 = require("../services/post-service");
const user_service_1 = require("../services/user-service");
const comment_service_1 = require("../services/comment-service");
class TestController {
    static testing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogService = new blog_service_1.BlogService();
                const postService = new post_service_1.PostService();
                const userService = new user_service_1.UserService();
                const commentService = new comment_service_1.CommentService();
                yield blogService.testingDelete();
                yield postService.testingDelete();
                yield userService.testingDelete();
                yield commentService.testingDelete();
                res.sendStatus(204);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        });
    }
}
exports.TestController = TestController;
//# sourceMappingURL=testing-controller.js.map