"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const Logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    defaultMeta: { service: "user-service" },
    handleExceptions: true,
    handleRejections: true,
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({
            filename: "./logs/error.log",
            level: "error",
        }),
        new winston_1.default.transports.File({ filename: "./logs/combined.log" }),
    ],
});
exports.default = Logger;
