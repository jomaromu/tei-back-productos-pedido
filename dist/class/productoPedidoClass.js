"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoPedido = void 0;
const mongoose = require("mongoose");
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale("es");
// Modelos
const producto_pedido_model_1 = __importDefault(require("../models/producto-pedido-model"));
class ProductoPedido {
    constructor() { }
    crearProductoPedido(req, resp) {
        const producto = new mongoose.Types.ObjectId(req.body.producto);
        const pedido = new mongoose.Types.ObjectId(req.body.pedido);
        const cantidad = req.body.cantidad;
        const precio = req.body.precio;
        const itbms = req.body.itbms;
        const crearProductoPed = new producto_pedido_model_1.default({
            producto,
            pedido,
            cantidad,
            precio,
            itbms,
        });
        crearProductoPed.save((err, productoPedidoDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: "Error al crear el producto pedido",
                    err,
                });
            }
            else {
                return resp.json({
                    ok: true,
                    productoPedidoDB,
                });
            }
        });
    }
    obtenerProductosPedidos(req, resp) {
        const pedido = new mongoose.Types.ObjectId(req.get("pedido"));
        producto_pedido_model_1.default
            .find({ pedido })
            .populate("producto")
            .exec((err, productosPedidos) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: "Error al obtener los productos pedidos",
                    err,
                });
            }
            else {
                return resp.json({
                    ok: true,
                    productosPedidos,
                });
            }
        });
    }
    eliminarProductoPedido(req, resp) {
        const _id = new mongoose.Types.ObjectId(req.get("id"));
        producto_pedido_model_1.default.findByIdAndDelete(_id, (err, productoPedidoDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: "Error al eliminar producto pedido",
                    err,
                });
            }
            else {
                return resp.json({
                    ok: true,
                    productoPedidoDB,
                });
            }
        });
    }
    editarSeguimientos(req, resp) {
        const idProdPed = new mongoose.Types.ObjectId(req.get("idProdPed"));
        const seg_disenio = req.body.seg_disenio;
        const seg_prod = req.body.seg_prod;
        const query = {
            idProdPed,
            seg_disenio,
            seg_prod,
        };
        producto_pedido_model_1.default.findByIdAndUpdate(idProdPed, query, { new: true }, (err, productoPedidoDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: "Error al editar el producto pedido",
                    err,
                });
            }
            else {
                return resp.json({
                    ok: true,
                    productoPedidoDB,
                });
            }
        });
    }
}
exports.ProductoPedido = ProductoPedido;
