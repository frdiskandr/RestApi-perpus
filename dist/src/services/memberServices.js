"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../app/database"));
const validate_1 = __importDefault(require("../validate/validate"));
const memberSchema_1 = __importDefault(require("../validate/schema/memberSchema"));
const addMember = async (req) => {
    const data = await (0, validate_1.default)(memberSchema_1.default, req);
    return await database_1.default.member.create({
        data: {
            code: data.code,
            name: data.name
        }
    });
};
const getAllMember = async () => {
    return await database_1.default.member.findMany({
        include: {
            borrowed: true,
            penalties: true
        }
    });
};
exports.default = { addMember, getAllMember };
