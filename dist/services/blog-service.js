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
exports.BlogService = void 0;
const blogs_repository_1 = require("../repositories/blogs-repository");
class BlogService {
    constructor() {
        this.blogRepository = new blogs_repository_1.BlogsRepository();
    }
    getAll(searchNameTerm, pageNumber = 1, pageSize = 10, sortBy = 'createdAt', sortDirection = 'desc') {
        return __awaiter(this, void 0, void 0, function* () {
            if (searchNameTerm)
                searchNameTerm = { name: { $regex: new RegExp(`.*${searchNameTerm}.*`, 'i') } };
            const skip = Number((pageNumber - 1) * pageSize);
            return yield this.blogRepository.getAllBlogs(searchNameTerm, skip, pageSize, sortBy, sortDirection);
        });
    }
    create(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.createBlog(name, description, websiteUrl);
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogRepository.getOneBlog(id);
            if (!blog)
                throw new Error();
            return blog;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findBlog = yield this.find(id);
            if (findBlog)
                return findBlog;
            throw new Error();
        });
    }
    update(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateBlog = yield this.blogRepository.updateBlog(id, name, description, websiteUrl);
            if (updateBlog)
                return updateBlog;
            throw new Error();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteBlog = yield this.blogRepository.deleteBlog(id);
            if (deleteBlog)
                return deleteBlog;
            throw new Error();
        });
    }
    testingDelete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.blogRepository.deleteAll();
        });
    }
}
exports.BlogService = BlogService;
//# sourceMappingURL=blog-service.js.map