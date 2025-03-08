"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tecknikal Test Api",
            version: "1.0.0",
            description: "Dokumentasi API menggunakan Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
function setupSwager(app) {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
}
exports.default = setupSwager;
