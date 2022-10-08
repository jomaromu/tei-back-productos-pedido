"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth/auth");
const productoPedidoClass_1 = require("../class/productoPedidoClass");
const productoPedidoRouter = (0, express_1.Router)();
exports.default = productoPedidoRouter;
productoPedidoRouter.post("/crearProductoPedido", [auth_1.verificaToken], (req, resp) => {
    const crearProductoPedido = new productoPedidoClass_1.ProductoPedido();
    crearProductoPedido.crearProductoPedido(req, resp);
});
productoPedidoRouter.get("/obtenerProductosPedidos", [auth_1.verificaToken], (req, resp) => {
    const obtenerProductosPedidos = new productoPedidoClass_1.ProductoPedido();
    obtenerProductosPedidos.obtenerProductosPedidos(req, resp);
});
productoPedidoRouter.delete("/eliminarProductoPedido", [auth_1.verificaToken], (req, resp) => {
    const eliminarProductoPedido = new productoPedidoClass_1.ProductoPedido();
    eliminarProductoPedido.eliminarProductoPedido(req, resp);
});
productoPedidoRouter.put("/editarSeguimientos", 
/*[verificaToken],*/
(req, resp) => {
    const editarSeguimientos = new productoPedidoClass_1.ProductoPedido();
    editarSeguimientos.editarSeguimientos(req, resp);
});
