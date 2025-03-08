"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memberServices_1 = __importDefault(require("../services/memberServices"));
async function getAllMembers(req, res, next) {
    try {
        const result = await memberServices_1.default.getAllMember();
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}
async function addMember(req, res, next) {
    try {
        const result = await memberServices_1.default.addMember(req.body);
        res.status(200).json({ message: `created member ${result.name}` });
    }
    catch (e) {
        next(e);
    }
}
exports.default = { getAllMembers, addMember };
