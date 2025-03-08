"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = __importDefault(require("../controller/bookController"));
const BookRouter = express_1.default.Router();
/**
 * @swagger
 * /books/:
 *   get:
 *     summary: Mendapatkan semua buku
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Daftar buku yang tersedia
 */
BookRouter.get("/", bookController_1.default.getAllBooks);
/**
 * @swagger
 * /books/add:
 *   post:
 *     summary: Menambahkan buku baru
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
 */
BookRouter.post("/add", bookController_1.default.addBook);
/**
 * @swagger
 * /books/borrow:
 *   put:
 *     summary: Meminjam buku
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *               memberId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Buku berhasil dipinjam
 */
BookRouter.put("/borrow", bookController_1.default.borrowBook);
/**
 * @swagger
 * /books/return:
 *   put:
 *     summary: Mengembalikan buku
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *               memberId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Buku berhasil dikembalikan
 */
BookRouter.put("/return", bookController_1.default.returnBook);
exports.default = BookRouter;
