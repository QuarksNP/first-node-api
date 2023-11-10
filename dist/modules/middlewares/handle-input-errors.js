"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputErrors = void 0;
const express_validator_1 = require("express-validator");
const handleInputErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ error: errors.array() });
    }
    else {
        next();
    }
};
exports.handleInputErrors = handleInputErrors;
//# sourceMappingURL=handle-input-errors.js.map