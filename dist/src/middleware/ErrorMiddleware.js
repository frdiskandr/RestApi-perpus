"use strict";
// import { Response, Request} from "express"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseError_1 = __importDefault(require("../Error/ResponseError"));
// Error-handling middleware
const errorMiddleware = (err, req, res, next) => {
    if (!err) {
        next();
    }
    if (err instanceof ResponseError_1.default) {
        res.status(err.status).json({ message: JSON.parse(err.message) });
    }
    else if (err) {
        res.status(400).json({ message: err.message });
    }
    else {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.default = errorMiddleware;
