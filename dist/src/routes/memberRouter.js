"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberController_1 = __importDefault(require("../controller/memberController"));
const MemberRouter = (0, express_1.Router)();
/**
 * @swagger
 * /members/:
 *   get:
 *     summary: Mendapatkan semua member
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Daftar semua member
 */
MemberRouter.get("/", memberController_1.default.getAllMembers);
/**
 * @swagger
 * /members/add:
 *   post:
 *     summary: Menambahkan member baru
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member berhasil ditambahkan
 */
MemberRouter.post("/add", memberController_1.default.addMember);
exports.default = MemberRouter;
