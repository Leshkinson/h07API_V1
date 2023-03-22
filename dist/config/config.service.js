"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfigService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
//import {UserEntity} from "../entity/user.entity";
//import {TokenEntity} from "../entity/token.entity";
//import {StrategyOptions} from "passport-google-oauth20";
//import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
//import {Secret, SignOptions} from "jsonwebtoken";
//import SMTPTransport from "nodemailer/lib/smtp-transport";
dotenv_1.default.config();
class ConfigService {
    constructor(env) {
        this.env = env;
        this.SECURE_MAILER_PORT = 465;
    }
    getValue({ key, throwOnMissing = true }) {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }
    ensureValues(keys) {
        keys.forEach(key => this.getValue({ key, throwOnMissing: true }));
        return this;
    }
    getPort() {
        return this.getValue({ key: "PORT", throwOnMissing: true });
    }
    isProduction() {
        return this.getValue({ key: "MODE", throwOnMissing: false }) === "production";
    }
    getDbURL() {
        return this.getValue({ key: "DB_URL", throwOnMissing: true });
    }
}
// const databaseConfigService: ConfigService = new ConfigService(process.env)
//     .ensureValues([
//         "POSTGRES_HOST",
//         "POSTGRES_PORT",
//         "POSTGRES_USER",
//         "POSTGRES_PASSWORD",
//         "POSTGRES_DATABASE",
//     ]);
// const authConfigService: ConfigService = new ConfigService(process.env)
//     .ensureValues([
//         "JWT_ACCESS_SECRET",
//         "TOKEN_LIVE_TIME"
//     ]);
// const mailerConfigService: ConfigService = new ConfigService(process.env)
//     .ensureValues([
//         "SMTP_HOST",
//         "SMTP_PORT",
//         "EMAIL_ADDRESS",
//         "EMAIL_PASSWORD",
//     ]);
// const googleConfigService: ConfigService  = new ConfigService(process.env)
//     .ensureValues([
//     "GOOGLE_CLIENT_ID",
//     "GOOGLE_CLIENT_SECRET",
//     "CALL_BACK_URL",
// ])
// const clientConfigService: ConfigService = new ConfigService(process.env)
//     .ensureValues(["CLIENT_URL"])
const serverConfigService = new ConfigService(process.env)
    .ensureValues([
    "PORT",
    "DB_URL"
]);
exports.serverConfigService = serverConfigService;
//# sourceMappingURL=config.service.js.map