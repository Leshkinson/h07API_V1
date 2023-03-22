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
exports.PostController = void 0;
const post_service_1 = require("../services/post-service");
const query_service_1 = require("../services/query-service");
class PostController {
    static getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postService = new post_service_1.PostService();
                const queryService = new query_service_1.QueryService();
                let { pageNumber, pageSize, sortBy, sortDirection } = req.query;
                pageNumber = Number(pageNumber !== null && pageNumber !== void 0 ? pageNumber : 1);
                pageSize = Number(pageSize !== null && pageSize !== void 0 ? pageSize : 10);
                const posts = yield postService.getAll(pageNumber, pageSize, sortBy, sortDirection);
                const totalCount = yield queryService.getTotalCountForPosts();
                res.status(200).json({
                    "pagesCount": Math.ceil(totalCount / pageSize),
                    "page": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalCount,
                    "items": posts
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        });
    }
    static createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postService = new post_service_1.PostService();
                const { title, shortDescription, content, blogId } = req.body;
                const newPost = yield postService.create(title, shortDescription, content, blogId);
                if (newPost)
                    res.status(201).json(newPost);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        });
    }
    static getOnePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postService = new post_service_1.PostService();
                const { id } = req.params;
                const findPost = yield postService.getOne(id);
                if (findPost)
                    res.status(200).json(findPost);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.sendStatus(404);
                    console.log(error.message);
                }
            }
        });
    }
    static updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postService = new post_service_1.PostService();
                const { id } = req.params;
                const { title, shortDescription, content, blogId } = req.body;
                const updatePost = yield postService.update(id, title, shortDescription, content, blogId);
                if (updatePost)
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
    static deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postService = new post_service_1.PostService();
                const { id } = req.params;
                yield postService.delete(id);
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
    static createCommentThePost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryService = new query_service_1.QueryService();
                const { postId } = req.params;
                const { content } = req.body;
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (token) {
                    console.log('here');
                    const newComment = yield queryService.createCommentForThePost(postId, content, token);
                    console.log({ newComment });
                    if (newComment)
                        res.status(201).json(newComment);
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
    static getAllCommentsForThePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('here');
                const queryService = new query_service_1.QueryService();
                const { postId } = req.params;
                let { pageNumber, pageSize, sortDirection, sortBy } = req.query;
                pageNumber = Number(pageNumber !== null && pageNumber !== void 0 ? pageNumber : 1);
                pageSize = Number(pageSize !== null && pageSize !== void 0 ? pageSize : 10);
                const comments = yield queryService.getCommentsForThePost(postId, pageNumber, pageSize, sortBy, sortDirection);
                const totalCount = yield queryService.getTotalCountCommentsForThePost(postId);
                console.log('totalCount', totalCount);
                res.status(200).json({
                    "pagesCount": Math.ceil(totalCount / pageSize),
                    "page": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalCount,
                    "items": comments
                });
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
exports.PostController = PostController;
//# sourceMappingURL=post-controller.js.map