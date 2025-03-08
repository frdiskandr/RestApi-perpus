"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../app/database"));
const validate_1 = __importDefault(require("../validate/validate"));
const memberSchema_1 = __importDefault(require("../validate/schema/memberSchema"));
const userMiddleware = (req, res, next) => {
    if (req.method !== "GET") {
        return next();
    }
    (0, validate_1.default)(memberSchema_1.default, req.body)
        .then((data) => {
        return database_1.default.member.findFirst({
            where: { code: data.code, name: data.name },
        });
    })
        .then((user) => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        next();
    })
        .catch((error) => next(error));
};
exports.default = userMiddleware;
