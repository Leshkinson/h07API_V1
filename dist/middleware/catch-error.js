"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrorMiddleware = void 0;
const validator_js_1 = require("../validator/validator.js");
const isErrorMiddleware = (req, res, next) => {
    const errors = (0, validator_js_1.myValidationResult)(req);
    console.log('Errors', errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errorsMessages: errors.array({ onlyFirstError: true }) });
    }
    next();
};
exports.isErrorMiddleware = isErrorMiddleware;
// export class CustomError extends Error {
//     constructor(public code: number) {
//         super();
//     }
// }
//# sourceMappingURL=catch-error.js.map