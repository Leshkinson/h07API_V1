import {Request, Response} from "express";
import {UserService} from "../services/user-service";
import {JWT, TokenService} from "../application/token-service";
import {TokenMapper} from "../dto/mappers/token-mapper";
import {QueryService} from "../services/query-service";


export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const userService = new UserService();
            const tokenService = new TokenService();

            const {loginOrEmail, password} = req.body;
            const user = await userService.verifyUser(loginOrEmail, password);

            if (user && user.isConfirmed) {
                const token = tokenService.generateToken(TokenMapper.prepareModel(user))

                res.status(200).json({
                    "accessToken": token
                })
            }
        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(401);
                console.log(error.message);
            }
        }
    }

    static async me(req: Request, res: Response) {
        try {
            const tokenService = new TokenService();
            const queryService = new QueryService();
            const token: string | undefined = req.headers.authorization?.split(' ')[1];
            console.log('Token', token)
            if (token) {
                const payload = await tokenService.getUserIdByToken(token) as JWT
                console.log('userId', payload)
                const user = await queryService.findUser(payload.id)
                res.status(200).json({
                    "email": user?.email,
                    "login": user?.login,
                    "userId": payload.id
                })
            }
        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(401);
                console.log(error.message);
            }
        }
    }

    static async registration(req: Request, res: Response) {
        try {
            const userService = new UserService();
            const {login, password, email} = req.body

            const user = await userService.findByEmail(email)
            console.log('User Validation Auth Controller', user)

            const unconfirmedUser = await userService.createByRegistration(login, password, email)
            console.log('unconfirmedUser', unconfirmedUser)
            res.sendStatus(204)
        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(400);
                console.log(error.message);
            }
        }
    }

    static async confirmEmail(req: Request, res: Response) {
        try {
            console.log('Here')
            const userService = new UserService();
            const {code} = req.body;
            console.log('code', code)
            const confirmed = await userService.confirmUser(code);
            if (confirmed) res.sendStatus(204)

        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(400);
                console.log(error.message);
            }
        }
    }

    static async resendConfirm(req: Request, res: Response) {
        try {
            const userService = new UserService();
            const{email} = req.body
            await userService.resendConfirmByUser(email)
            res.sendStatus(204)
        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(400);
                console.log(error.message);
            }
        }
    }

    static async testMail(req: Request, res: Response) {
        try {
            const userService = new UserService();
            const{email} = req.body
            console.log('email',email)
            await userService.test(email)
            res.sendStatus(204)
        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(400);
                console.log(error.message);
            }
        }

    }

}

