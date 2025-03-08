"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const validate_1 = __importDefault(require("../validate/validate"));
const bookSchema_1 = __importDefault(require("../validate/schema/bookSchema"));
const prisma = new client_1.PrismaClient();
async function GetAllBooks() {
    return await prisma.book.findMany();
}
async function AddBook(req) {
    const data = await (0, validate_1.default)(bookSchema_1.default.bookSchema, req);
    return await prisma.book.create({
        data: {
            code: data.code,
            title: data.title,
            author: data.author,
            stock: data.stock
        },
    });
}
async function borrowBook(req) {
    const data = await (0, validate_1.default)(bookSchema_1.default.Book, req);
    const member = await prisma.member.findUnique({
        where: {
            id: data.memberId
        },
        include: {
            penalties: true
        }
    });
    if (!member) {
        return {
            message: "Member not found"
        };
    }
    if (member.penalties.length > 0) {
        return {
            message: "Member has outstanding penalties"
        };
    }
    const book = await prisma.book.findUnique({
        where: {
            id: data.bookId
        }
    });
    if (!book) {
        return {
            message: "Book not found"
        };
    }
    if (book.stock <= 0) {
        return {
            message: "Book is out of stock"
        };
    }
    await prisma.borrow.create({
        data: {
            memberId: data.memberId,
            bookId: data.bookId
        }
    });
    await prisma.book.update({
        where: {
            id: data.bookId
        },
        data: {
            stock: book.stock - 1
        }
    });
    return {
        message: "Book borrowed successfully"
    };
}
const returnBook = async (req) => {
    const data = await (0, validate_1.default)(bookSchema_1.default.Book, req);
    const member = await prisma.member.findUnique({
        where: {
            id: data.memberId
        },
        include: {
            borrowed: true
        }
    });
    if (!member) {
        return {
            message: "Member not found"
        };
    }
    const borrow = await prisma.borrow.findFirst({
        where: {
            memberId: data.memberId,
            bookId: data.bookId
        }
    });
    if (!borrow) {
        return {
            message: "No active borrow found"
        };
    }
    const returnDate = new Date();
    const borrowDate = new Date(borrow.borrowDate);
    const daysBorrowed = Math.ceil((returnDate.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24));
    await prisma.borrow.update({
        where: { id: borrow.id },
        data: { returnDate },
    });
    await prisma.book.update({
        where: { id: data.bookId },
        data: { stock: { increment: 1 } },
    });
    if (daysBorrowed > 7) {
        await prisma.penalty.create({
            data: {
                memberId: data.memberId,
                startDate: returnDate,
                endDate: new Date(returnDate.getTime() + 3 * 24 * 60 * 60 * 1000),
            },
        });
    }
    return {
        message: "Book returned successfully"
    };
};
exports.default = {
    GetAllBooks,
    AddBook,
    borrowBook,
    returnBook
};
