import express from "express";
import Controller from "../controller/bookController";

const BookRouter = express.Router();

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
BookRouter.get("/", Controller.getAllBooks);

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
BookRouter.post("/add", Controller.addBook);

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
BookRouter.put("/borrow", Controller.borrowBook);

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
BookRouter.put("/return", Controller.returnBook);

export default BookRouter;
