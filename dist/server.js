"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./router"));
const auth_1 = require("./modules/auth");
const user_1 = require("./handlers/user");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});
app.use('/api', auth_1.protect, router_1.default);
app.post('/user', user_1.createUser);
app.post('/signin', user_1.signin);
app.use((err, req, res, next) => {
    if (err.type === 'auth')
        res.status(401).json({ message: "unauthenticated" });
    if (err.type === 'input')
        res.status(400).json({ message: "invalid input" });
    else
        res.status(500).json({ message: "Sorry bro, It's my fault!" });
});
exports.default = app;
//# sourceMappingURL=server.js.map