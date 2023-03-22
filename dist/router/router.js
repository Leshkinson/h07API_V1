"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const catch_error_1 = require("../middleware/catch-error");
const auth_1 = require("../middleware/auth");
const blog_controller_1 = require("../controllers/blog-controller");
const post_controller_1 = require("../controllers/post-controller");
const testing_controller_1 = require("../controllers/testing-controller");
const authorization_1 = require("../authorizations/authorization");
const validator_1 = require("../validator/validator");
const user_controller_1 = require("../controllers/user-controller");
const comment_controller_1 = require("../controllers/comment-controller");
exports.router = (0, express_1.Router)();
/**Test**/
exports.router.delete('/testing/all-data', testing_controller_1.TestController.testing);
/**Blogs**/
exports.router.get('/blogs', blog_controller_1.BlogController.getAllBlogs);
exports.router.post('/blogs', authorization_1.basicAuthorization, validator_1.blogValidation, catch_error_1.isErrorMiddleware, blog_controller_1.BlogController.createBlog);
exports.router.get('/blogs/:id', blog_controller_1.BlogController.getOneBlog);
exports.router.put('/blogs/:id', authorization_1.basicAuthorization, validator_1.blogValidation, catch_error_1.isErrorMiddleware, blog_controller_1.BlogController.updateBlog);
exports.router.delete('/blogs/:id', authorization_1.basicAuthorization, blog_controller_1.BlogController.deleteBlog);
exports.router.get('/blogs/:blogId/posts', blog_controller_1.BlogController.getAllPostsForTheBlog);
exports.router.post('/blogs/:blogId/posts', authorization_1.basicAuthorization, validator_1.postValidationWithoutBodyId, catch_error_1.isErrorMiddleware, blog_controller_1.BlogController.createPostTheBlog);
/**Posts**/
exports.router.get('/posts', post_controller_1.PostController.getAllPosts);
exports.router.post('/posts', authorization_1.basicAuthorization, validator_1.postValidation, catch_error_1.isErrorMiddleware, post_controller_1.PostController.createPost);
exports.router.get('/posts/:id', post_controller_1.PostController.getOnePost);
exports.router.put('/posts/:id', authorization_1.basicAuthorization, validator_1.postValidation, catch_error_1.isErrorMiddleware, post_controller_1.PostController.updatePost);
exports.router.delete('/posts/:id', authorization_1.basicAuthorization, post_controller_1.PostController.deletePost);
exports.router.get('/posts/:postId/comments', post_controller_1.PostController.getAllCommentsForThePost);
exports.router.post('/posts/:postId/comments', auth_1.authMiddleware, validator_1.commentValidation, catch_error_1.isErrorMiddleware, post_controller_1.PostController.createCommentThePost);
/**Users**/
exports.router.get('/users', authorization_1.basicAuthorization, user_controller_1.UserController.getAllUsers);
exports.router.post('/users', authorization_1.basicAuthorization, validator_1.userValidation, catch_error_1.isErrorMiddleware, user_controller_1.UserController.createUser);
exports.router.delete('/users/:id', authorization_1.basicAuthorization, user_controller_1.UserController.deleteUser);
/**Comments**/
exports.router.put('/comments/:commentId', auth_1.authMiddleware, validator_1.commentValidation, catch_error_1.isErrorMiddleware, comment_controller_1.CommentController.updateComment);
exports.router.delete('/comments/:id', auth_1.authMiddleware, comment_controller_1.CommentController.deleteComment);
exports.router.get('/comments/:id', comment_controller_1.CommentController.getOneComment);
/**Auth**/
exports.router.post('/auth/login', user_controller_1.UserController.login);
exports.router.post('/auth/registration-confirmation');
exports.router.post('/auth/registration');
exports.router.post('/auth/registration-email-resending');
exports.router.get('/auth/me', auth_1.authMiddleware, catch_error_1.isErrorMiddleware, user_controller_1.UserController.me);
//# sourceMappingURL=router.js.map