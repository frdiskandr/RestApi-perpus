"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./swagger"));
const bookRouter_1 = __importDefault(require("../routes/bookRouter"));
const memberRouter_1 = __importDefault(require("../routes/memberRouter"));
const ErrorMiddleware_1 = __importDefault(require("../middleware/ErrorMiddleware"));
const NotFoundMiddleware_1 = __importDefault(require("../middleware/NotFoundMiddleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// setup swager
(0, swagger_1.default)(app);
//routes
app.use("/books", bookRouter_1.default);
app.use("/members", memberRouter_1.default);
app.use(NotFoundMiddleware_1.default);
app.use(ErrorMiddleware_1.default);
exports.default = app;
