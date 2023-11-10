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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getOneProduct = exports.getProducts = void 0;
const prisma_client_1 = __importDefault(require("../utils/prisma-client"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_client_1.default.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    });
    res.json({ data: user.products });
});
exports.getProducts = getProducts;
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const product = yield prisma_client_1.default.product.findFirst({
        where: {
            id,
            user_id: req.user.id
        }
    });
    res.json({ data: product });
});
exports.getOneProduct = getOneProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_client_1.default.product.create({
        data: {
            name: req.body.name,
            user_id: req.user.id
        }
    });
    res.json({ data: product });
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield prisma_client_1.default.product.update({
        where: {
            id_user_id: {
                id: req.params.id,
                user_id: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    });
    res.json({ data: update });
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield prisma_client_1.default.product.delete({
        where: {
            id_user_id: {
                id: req.params.id,
                user_id: req.user.id
            }
        }
    });
    res.json({ data: deleted });
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.js.map