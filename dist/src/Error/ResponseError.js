"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.default = ResponseError;
