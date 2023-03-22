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
exports.PostService = void 0;
const posts_repository_1 = require("../repositories/posts-repository");
const blogs_repository_1 = require("../repositories/blogs-repository");
class PostService {
    constructor() {
        this.postRepository = new posts_repository_1.PostsRepository();
        this.blogRepository = new blogs_repository_1.BlogsRepository();
    }
    getAll(pageNumber = 1, pageSize = 10, sortBy = 'createdAt', sortDirection = 'desc') {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (pageNumber - 1) * pageSize;
            return yield this.postRepository.getAllPosts(pageNumber, pageSize, sortBy, skip, sortDirection);
        });
    }
    create(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogRepository.getOneBlog(blogId);
            if (blog) {
                return yield this.postRepository.createPost(title, shortDescription, content, (blog === null || blog === void 0 ? void 0 : blog._id).toString(), blog === null || blog === void 0 ? void 0 : blog.name);
            }
            throw new Error();
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepository.getOnePost(id);
            if (!post)
                throw new Error();
            return post;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findPost = yield this.find(id);
            if (findPost)
                return findPost;
            throw new Error();
        });
    }
    update(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogRepository.getOneBlog(blogId);
            const updatePost = yield this.postRepository.updatePost(id, title, shortDescription, content, blogId);
            if (blog && updatePost) {
                updatePost.title = title;
                updatePost.shortDescription = shortDescription;
                updatePost.content = content;
                return updatePost;
            }
            throw new Error();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletePost = yield this.postRepository.deletePost(id);
            if (deletePost)
                return deletePost;
            throw new Error();
        });
    }
    testingDelete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.postRepository.deleteAll();
        });
    }
}
exports.PostService = PostService;
//# sourceMappingURL=post-service.js.map