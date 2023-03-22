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
exports.QueryService = void 0;
const blog_model_1 = require("../models/blog-model");
const post_model_1 = require("../models/post-model");
const comment_model_1 = require("../models/comment-model");
const mongoose_1 = __importDefault(require("mongoose"));
const blogs_repository_1 = require("../repositories/blogs-repository");
const posts_repository_1 = require("../repositories/posts-repository");
const users_repository_1 = require("../repositories/users-repository");
const user_model_1 = require("../models/user-model");
const token_service_1 = require("../application/token-service");
const comments_repository_1 = require("../repositories/comments-repository");
class QueryService {
    constructor() {
        this.blogRepository = new blogs_repository_1.BlogsRepository();
        this.postRepository = new posts_repository_1.PostsRepository();
        this.userRepository = new users_repository_1.UsersRepository();
        this.postModel = post_model_1.PostModel;
        this.blogModel = blog_model_1.BlogModel;
        this.userModel = user_model_1.UserModel;
        this.commentModel = comment_model_1.CommentModel;
    }
    findBlog(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogRepository.getOneBlog(blogId);
            // if (!blog) throw new Error();
            return blog;
        });
    }
    findPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepository.getOnePost(postId);
            // if (!post) throw new Error();
            return post;
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUserById(id);
            console.log('User', user);
            // if (!user) throw new Error();
            return user;
        });
    }
    getTotalCountForBlogs(searchNameTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            if (searchNameTerm)
                searchNameTerm = { name: { $regex: new RegExp(`.*${searchNameTerm}.*`, 'i') } };
            return yield this.blogRepository.getBlogsCount(searchNameTerm);
        });
    }
    getTotalCountForUsers(searchLoginTerm, searchEmailTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            if (searchLoginTerm)
                searchLoginTerm = { login: { $regex: new RegExp(`.*${searchLoginTerm}.*`, 'i') } };
            if (searchEmailTerm)
                searchEmailTerm = { email: { $regex: new RegExp(`.*${searchEmailTerm}.*`, 'i') } };
            return yield this.userRepository.getUsersCount(searchLoginTerm, searchEmailTerm);
        });
    }
    getTotalCountForPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postModel.find().count();
        });
    }
    getTotalCountPostsForTheBlog(blogId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.findBlog(blogId);
            return this.postModel.find({ blogId: (_a = (blog === null || blog === void 0 ? void 0 : blog._id)) === null || _a === void 0 ? void 0 : _a.toString() }).count();
        });
    }
    createPostForTheBlog(blogId, title, shortDescription, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.findBlog(blogId);
            if (blog) {
                const blogId = new mongoose_1.default.Types.ObjectId((blog === null || blog === void 0 ? void 0 : blog._id).toString());
                return yield this.postModel.create({ title, shortDescription, content, blogId, blogName: blog === null || blog === void 0 ? void 0 : blog.name });
            }
            throw new Error();
        });
    }
    getPostsForTheBlog(blogId, pageNumber = 1, pageSize = 10, sortBy = 'createdAt', sortDirection = 'desc') {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.findBlog(blogId);
            const skip = (+pageNumber - 1) * +pageSize;
            if (blog) {
                return this.postModel.find({ blogId: (_a = (blog === null || blog === void 0 ? void 0 : blog._id)) === null || _a === void 0 ? void 0 : _a.toString() }).sort({ [sortBy]: sortDirection }).skip(skip).limit(+pageSize);
            }
            throw new Error();
        });
    }
    createCommentForThePost(postId, content, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenService = new token_service_1.TokenService();
            const queryService = new QueryService();
            const commentRepository = new comments_repository_1.CommentsRepository();
            const post = yield this.findPost(postId);
            if (post) {
                const payload = yield tokenService.getUserIdByToken(token);
                console.log('payload query-service', payload);
                const user = yield queryService.findUser(payload.id);
                console.log('User', user);
                if (user) {
                    console.log('Here2');
                    console.log({ content });
                    console.log({ postId });
                    console.log('payload.id', payload.id);
                    console.log('login', user.login);
                    const comm = yield commentRepository.createComment(content, postId, payload.id, user.login);
                    console.log('Comment', comm);
                    return comm;
                }
            }
            throw new Error();
        });
    }
    getCommentsForThePost(postId, pageNumber = 1, pageSize = 10, sortBy = 'createdAt', sortDirection = 'desc') {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('here2');
            const post = yield this.findPost(postId);
            console.log('Post', post);
            const skip = (+pageNumber - 1) * +pageSize;
            if (post) {
                const comments = yield this.commentModel.find({ postId: (_a = (post === null || post === void 0 ? void 0 : post._id)) === null || _a === void 0 ? void 0 : _a.toString() }).sort({ [sortBy]: sortDirection }).skip(skip).limit(+pageSize);
                console.log('query-service comments', comments);
                return comments;
            }
            throw new Error();
        });
    }
    getTotalCountCommentsForThePost(postId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.findPost(postId);
            return this.commentModel.find({ postId: (_a = (post === null || post === void 0 ? void 0 : post._id)) === null || _a === void 0 ? void 0 : _a.toString() }).count();
        });
    }
}
exports.QueryService = QueryService;
//# sourceMappingURL=query-service.js.map