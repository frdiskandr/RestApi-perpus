import { Request, Response, NextFunction } from "express";

// Middleware untuk menangani 404 Not Found
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: "Resource not found",
        path: req.originalUrl,
    });
};

export default notFoundHandler