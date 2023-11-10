"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedUpdate = exports.updatedUpdate = exports.createUpdate = exports.getUpdates = exports.getOneUpdate = void 0;
const prisma_client_1 = __importDefault(require("../utils/prisma-client"));
const getOneUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield prisma_client_1.default.update.findUnique({
        where: {
            id: req.params.id
        }
    });
    res.json({ data: update });
});
exports.getOneUpdate = getOneUpdate;
const getUpdates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma_client_1.default.product.findMany({
        where: {
            user_id: req.user.id,
        },
        include: {
            updates: true
        }
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);
    res.json({ data: updates });
});
exports.getUpdates = getUpdates;
const createUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_client_1.default.product.findUnique({
        where: {
            id: req.body.product_id
        }
    });
    if (!product) {
        return res.json({ message: "NOP" });
    }
    const update = yield prisma_client_1.default.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {
                connect: {
                    id: product.id
                }
            }
        }
    });
    return res.json({ data: update });
});
exports.createUpdate = createUpdate;
const updatedUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma_client_1.default.product.findMany({
        where: {
            user_id: req.user.id,
        },
        include: {
            updates: true
        }
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);
    const match = updates.find(update => update.id === req.params.id);
    if (!match) {
        return res.json({ message: "NOPE" });
    }
    const updated = yield prisma_client_1.default.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    });
    res.json({ data: updated });
});
exports.updatedUpdate = updatedUpdate;
const deletedUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma_client_1.default.product.findMany({
        where: {
            user_id: req.user.id,
        },
        include: {
            updates: true
        }
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);
    const match = updates.find(update => update.id === req.params.id);
    if (!match) {
        return res.json({ message: "NOPE" });
    }
    const deleted = yield prisma_client_1.default.update.delete({
        where: {
            id: req.params.id
        }
    });
    res.json({ data: deleted });
});
exports.deletedUpdate = deletedUpdate;
//# sourceMappingURL=updates.js.map