"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = __importDefault(require("./src/app/web"));
const port = process.env.PORT || 3000;
web_1.default.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
