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
exports.BlogsRepository = void 0;
const blog_model_1 = require("../models/blog-model");
class BlogsRepository {
    constructor() {
        this.blogModel = blog_model_1.BlogModel;
    }
    getAllBlogs(searchNameTerm = {}, skip = 0, limit = 10, sortBy = 'createdAt', sortDirection = 'desc') {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogModel.find(searchNameTerm).sort({ [sortBy]: sortDirection }).skip(skip).limit(limit);
        });
    }
    getBlogsCount(searchNameTerm = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogModel.countDocuments(searchNameTerm);
        });
    }
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.blogModel.create({ name, description, websiteUrl, isMembership: false });
        });
    }
    getOneBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogModel.findById({ _id: id });
        });
    }
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogModel.findOneAndUpdate({ _id: id }, {
                name,
                description,
                websiteUrl
            });
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogModel.findOneAndDelete({ _id: id });
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogModel.deleteMany();
        });
    }
}
exports.BlogsRepository = BlogsRepository;
//# sourceMappingURL=blogs-repository.js.map