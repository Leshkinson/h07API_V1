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
exports.BlogController = void 0;
const blog_service_1 = require("../services/blog-service");
const query_service_1 = require("../services/query-service");
class BlogController {
    static getAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogService = new blog_service_1.BlogService();
                const queryService = new query_service_1.QueryService();
                let { pageNumber, pageSize, sortBy, searchNameTerm, sortDirection } = req.query;
                pageNumber = Number(pageNumber !== null && pageNumber !== void 0 ? pageNumber : 1);
                pageSize = Number(pageSize !== null && pageSize !== void 0 ? pageSize : 10);
                const blogs = yield blogService.getAll(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection);
                const totalCount = yield queryService.getTotalCountForBlogs(searchNameTerm);
                res.status(200).json({
                    "pagesCount": Math.ceil(totalCount / pageSize),
                    "page": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalCount,
                    "items": blogs,
                });
            }
            catch (error) {
                if (error instanceof Error)
                    throw new Error(error.message);
            }
        });
    }
    static createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogService = new blog_service_1.BlogService();
                const { name, description, websiteUrl } = req.body;
                const newBlogs = yield blogService.create(name, description, websiteUrl);
                res.status(201).json(newBlogs);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        });
    }
    static getOneBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogService = new blog_service_1.BlogService();
                const { id } = req.params;
                const findBlog = yield blogService.getOne(id);
                res.status(200).json(findBlog);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.sendStatus(404);
                    console.log(error.message);
                }
            }
        });
    }
    static updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogService = new blog_service_1.BlogService();
                const { id } = req.params;
                const { name, description, websiteUrl } = req.body;
                const updateBlog = yield blogService.update(id, name, description, websiteUrl);
                if (updateBlog)
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
    static deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogService = new blog_service_1.BlogService();
                const { id } = req.params;
                yield blogService.delete(id);
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
    static getAllPostsForTheBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryService = new query_service_1.QueryService();
                const { blogId } = req.params;
                let { pageNumber, pageSize, sortDirection, sortBy } = req.query;
                pageNumber = Number(pageNumber !== null && pageNumber !== void 0 ? pageNumber : 1);
                pageSize = Number(pageSize !== null && pageSize !== void 0 ? pageSize : 10);
                const posts = yield queryService.getPostsForTheBlog(blogId, pageNumber, pageSize, sortBy, sortDirection);
                const totalCount = yield queryService.getTotalCountPostsForTheBlog(blogId);
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
                    res.sendStatus(404);
                    console.log(error.message);
                }
            }
        });
    }
    static createPostTheBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryService = new query_service_1.QueryService();
                const { blogId } = req.params;
                const { title, shortDescription, content } = req.body;
                const newPost = yield queryService.createPostForTheBlog(blogId, title, shortDescription, content);
                if (newPost)
                    res.status(201).json(newPost);
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
exports.BlogController = BlogController;
//# sourceMappingURL=blog-controller.js.map