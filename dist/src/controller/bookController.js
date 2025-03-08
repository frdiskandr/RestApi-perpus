"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../app/logger"));
const bookServices_1 = __importDefault(require("../services/bookServices"));
const getAllBooks = async (req, res) => {
    try {
        const response = await bookServices_1.default.GetAllBooks();
        res.status(200).json(response);
        return;
    }
    catch (error) {
        logger_1.default.error(error);
    }
};
const addBook = async (req, res, next) => {
    try {
        const response = await bookServices_1.default.AddBook(req.body);
        res.status(200).json({ message: `created book with title ${response.title}` });
    }
    catch (e) {
        next(e);
    }
};
const borrowBook = async (req, res, next) => {
    try {
        const response = await bookServices_1.default.borrowBook(req.body);
        res.status(200).json(response);
    }
    catch (e) {
        next(e);
    }
};
const returnBook = async (req, res, next) => {
    try {
        const response = await bookServices_1.default.returnBook(req.body);
        res.status(200).json(response);
    }
    catch (e) {
        next(e);
    }
};
exports.default = { getAllBooks, addBook, borrowBook, returnBook };
