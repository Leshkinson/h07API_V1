import {NextFunction, Request, Response} from "express";
import {myValidationResult} from "../validator/validator.js";

export const isErrorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = myValidationResult(req);
    console.log('Errors', errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({errorsMessages: errors.array({onlyFirstError: true})});
    }

    next()
};

// export class CustomError extends Error {
//     constructor(public code: number) {
//         super();
//     }
// }