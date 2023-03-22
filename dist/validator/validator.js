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
exports.commentValidation = exports.userValidation = exports.postValidation = exports.postValidationWithoutBodyId = exports.blogValidation = exports.contentValidation = exports.emailValidation = exports.passwordValidation = exports.loginValidation = exports.blogIdValidation = exports.contentDescriptionValidation = exports.shortDescriptionValidation = exports.titleValidation = exports.websiteUrlValidation = exports.descriptionValidation = exports.nameValidation = exports.myValidationResult = void 0;
const blog_service_1 = require("../services/blog-service");
const express_validator_1 = require("express-validator");
exports.myValidationResult = express_validator_1.validationResult.withDefaults({
    formatter: error => {
        return {
            message: error.msg,
            field: error.param
        };
    },
});
const isWebsiteUrlPattern = (value) => {
    const patternURL = new RegExp(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/);
    if (!patternURL.test(value)) {
        throw new Error();
    }
    return true;
};
const isBodyIdPattern = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const blogService = new blog_service_1.BlogService();
    const blog = yield blogService.getOne(value);
    if (!blog) {
        throw new Error();
    }
    return true;
});
const isLoginPattern = (value) => {
    const patternLogin = new RegExp(/^[a-zA-Z0-9_-]*$/);
    if (!patternLogin.test(value)) {
        throw new Error();
    }
    return true;
};
const isEmailPattern = (value) => {
    const patternEmail = new RegExp(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!patternEmail.test(value)) {
        throw new Error();
    }
    return true;
};
exports.nameValidation = (0, express_validator_1.body)('name')
    .trim()
    .isLength({ max: 15 })
    .withMessage("Name has incorrect length. (Name has more than 15 characters)")
    .notEmpty()
    .withMessage("Name has incorrect length. (Name is empty)")
    .isString()
    .withMessage("Name has incorrect value. (Name isn't string)");
exports.descriptionValidation = (0, express_validator_1.body)('description')
    .trim()
    .isLength({ max: 500 })
    .withMessage("Name has incorrect length. (Description has more than 500 characters)")
    .notEmpty()
    .withMessage("Name has incorrect length. (Name is empty)")
    .isString()
    .withMessage("Name has incorrect value. (Name isn't string)");
exports.websiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .trim()
    .isLength({ max: 100 })
    .withMessage("YoutubeUrl has incorrect length. (YoutubeUrl has more than 100 characters)")
    .isString()
    .withMessage("YoutubeUrl has incorrect value. (YoutubeUrl is empty)")
    .custom(isWebsiteUrlPattern)
    .withMessage("YoutubeUrl has incorrect value. (YoutubeUrl doesn't match pattern)");
exports.titleValidation = (0, express_validator_1.body)('title')
    .trim()
    .isLength({ max: 30 })
    .withMessage("Title has incorrect length. (Title has more than 30 characters)")
    .notEmpty()
    .withMessage("Title has incorrect length. (Title is empty)")
    .isString()
    .withMessage("Title has incorrect value. (Title isn't string)");
exports.shortDescriptionValidation = (0, express_validator_1.body)('shortDescription')
    .trim()
    .isLength({ max: 100 })
    .withMessage("ShortDescription has incorrect length. (ShortDescription has more than 100 characters)")
    .notEmpty()
    .withMessage("ShortDescription has incorrect length. (ShortDescription is empty)")
    .isString()
    .withMessage("ShortDescription has incorrect value. (ShortDescription isn't string)");
exports.contentDescriptionValidation = (0, express_validator_1.body)('content')
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Content has incorrect length. (Content has more than 1000 characters)")
    .notEmpty()
    .withMessage("Content has incorrect length. (Content is empty)")
    .isString()
    .withMessage("Content has incorrect value. (Content isn't string)");
exports.blogIdValidation = (0, express_validator_1.body)('blogId')
    .trim()
    .isString()
    .withMessage("BlogId has incorrect value. (BlogId doesn't string)")
    .custom(isBodyIdPattern)
    .withMessage("BlogId has incorrect value. (BlogId not found)");
exports.loginValidation = (0, express_validator_1.body)('login')
    .trim()
    .isString()
    .withMessage("Login has incorrect value. (BlogId doesn't string)")
    .isLength({ min: 3, max: 10 })
    .withMessage("Login has incorrect value. (Content has less than 3 or more than 10 characters)")
    .custom(isLoginPattern)
    .withMessage("Login has incorrect value. (Login doesn't match pattern)");
exports.passwordValidation = (0, express_validator_1.body)('password')
    .trim()
    .isString()
    .withMessage("Password has incorrect value. (BlogId doesn't string)")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password has incorrect value. (Content has less than 6 or more than 20 characters)");
exports.emailValidation = (0, express_validator_1.body)('email')
    .trim()
    .isString()
    .withMessage("Login has incorrect value. (BlogId doesn't string)")
    .custom(isEmailPattern)
    .withMessage("Login has incorrect value. (Login doesn't match pattern)");
exports.contentValidation = (0, express_validator_1.body)('content')
    .trim()
    .isString()
    .withMessage("Content has incorrect value. (BlogId doesn't string)")
    .isLength({ min: 20, max: 300 })
    .withMessage("Content has incorrect value. (Content has less than 20 or more than 300 characters)");
exports.blogValidation = [exports.nameValidation, exports.descriptionValidation, exports.websiteUrlValidation];
exports.postValidationWithoutBodyId = [exports.titleValidation, exports.shortDescriptionValidation, exports.contentDescriptionValidation];
exports.postValidation = [exports.titleValidation, exports.shortDescriptionValidation, exports.contentDescriptionValidation, exports.blogIdValidation];
exports.userValidation = [exports.loginValidation, exports.passwordValidation, exports.emailValidation];
exports.commentValidation = [exports.contentValidation];
//# sourceMappingURL=validator.js.map