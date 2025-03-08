"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("./logger"));
const Prisma = new client_1.PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
        {
            emit: "event",
            level: "error",
        }
    ]
});
Prisma.$use(async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();
    const duration = after - before;
    logger_1.default.info(`${params.model}.${params.action} took ${duration}ms`);
    return result;
});
Prisma.$on("query", (e) => {
    logger_1.default.info(e.query);
    logger_1.default.info(e.params);
});
Prisma.$on("error", (e) => {
    logger_1.default.error(e);
});
exports.default = Prisma;
