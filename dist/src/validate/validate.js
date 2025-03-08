"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validate = async (schema, req) => {
    const result = await schema.validate(req);
    if (result.error) {
        throw new Error(result.errors);
    }
    return result;
};
exports.default = Validate;
