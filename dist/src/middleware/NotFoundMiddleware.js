"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware untuk menangani 404 Not Found
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Resource not found",
        path: req.originalUrl,
    });
};
exports.default = notFoundHandler;
