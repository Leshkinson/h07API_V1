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
exports.PostsRepository = void 0;
const post_model_1 = require("../models/post-model");
class PostsRepository {
    constructor() {
        this.postModel = post_model_1.PostModel;
    }
    getAllPosts(pageNumber = 1, limit = 10, sortBy = 'createdAt', skip = 0, sortDirection = 'desc') {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postModel.find().sort({ [sortBy]: sortDirection }).skip(skip).limit(limit);
        });
    }
    createPost(title, shortDescription, content, blogId, blogName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postModel.create({ title, shortDescription, content, blogId, blogName });
        });
    }
    getOnePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postModel.findById({ _id: id });
        });
    }
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postModel.findOneAndUpdate({ _id: id }, {
                title,
                shortDescription,
                content,
                blogId
            });
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postModel.findOneAndDelete({ _id: id });
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postModel.deleteMany();
        });
    }
}
exports.PostsRepository = PostsRepository;
//# sourceMappingURL=posts-repository.js.map