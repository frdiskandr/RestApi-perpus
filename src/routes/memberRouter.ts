import { Router } from "express";
import Controller from "../controller/memberController";

const MemberRouter = Router();

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
MemberRouter.get("/", Controller.getAllMembers);

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
MemberRouter.post("/add", Controller.addMember);

export default MemberRouter;
