"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoPedido = void 0;
const mongoose = require("mongoose");
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale("es");
const server_1 = __importDefault(require("./server"));
// Modelos
const producto_pedido_model_1 = __importDefault(require("../models/producto-pedido-model"));
class ProductoPedido {
    constructor() { }
    crearProductoPedido(req, resp) {
        const producto = new mongoose.Types.ObjectId(req.body.producto);
        const foranea = new mongoose.Types.ObjectId(req.body.foranea);
        const idEmpresa = req.body.foranea;
        const pedido = new mongoose.Types.ObjectId(req.body.pedido);
        const cantidad = req.body.cantidad;
        const precio = req.body.precio;
        const itbms = req.body.itbms;
        const crearProductoPed = new producto_pedido_model_1.default({
            producto,
            foranea,
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
                const server = server_1.default.instance;
                server.io
                    .in(idEmpresa)
                    .emit("cargar-productos-pedidos", { ok: true });
                server.io.in(idEmpresa).emit("cargar-seguimiento", { ok: true });
                return resp.json({
                    ok: true,
                    productoPedidoDB,
                });
            }
        });
    }
    obtenerProductosPedidos(req, resp) {
        const pedido = new mongoose.Types.ObjectId(req.get("pedido"));
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        producto_pedido_model_1.default
            .find({ pedido, foranea })
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
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        const idEmpresa = req.get("foranea");
        producto_pedido_model_1.default.findOneAndDelete({ _id, foranea }, (err, productoPedidoDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: "Error al eliminar producto pedido",
                    err,
                });
            }
            else {
                const server = server_1.default.instance;
                server.io
                    .in(idEmpresa)
                    .emit("cargar-productos-pedidos", { ok: true });
                server.io.in(idEmpresa).emit("cargar-seguimiento", { ok: true });
                return resp.json({
                    ok: true,
                    productoPedidoDB,
                });
            }
        });
    }
    editarSeguimientos(req, resp) {
        const _id = new mongoose.Types.ObjectId(req.body.idProdPed);
        const foranea = new mongoose.Types.ObjectId(req.body.foranea);
        const seg_disenio = req.body.seg_disenio;
        const seg_prod = req.body.seg_prod;
        const query = {
            seg_disenio,
            seg_prod,
        };
        producto_pedido_model_1.default.findOneAndUpdate({ _id, foranea }, query, { new: true }, (err, productoPedidoDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: "Error al editar el producto pedido",
                    err,
                });
            }
            else {
                const server = server_1.default.instance;
                server.io.emit("cargar-seguimiento", { ok: true });
                return resp.json({
                    ok: true,
                    productoPedidoDB,
                });
            }
        });
    }
}
exports.ProductoPedido = ProductoPedido;
