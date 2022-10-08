import { Router, Request, Response } from "express";
import { verificaToken } from "../auth/auth";
import { ProductoPedido } from "../class/productoPedidoClass";

const productoPedidoRouter = Router();

export default productoPedidoRouter;

productoPedidoRouter.post(
  "/crearProductoPedido",
  [verificaToken],
  (req: Request, resp: Response) => {
    const crearProductoPedido = new ProductoPedido();
    crearProductoPedido.crearProductoPedido(req, resp);
  }
);

productoPedidoRouter.get(
  "/obtenerProductosPedidos",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerProductosPedidos = new ProductoPedido();
    obtenerProductosPedidos.obtenerProductosPedidos(req, resp);
  }
);

productoPedidoRouter.delete(
  "/eliminarProductoPedido",
  [verificaToken],
  (req: Request, resp: Response) => {
    const eliminarProductoPedido = new ProductoPedido();
    eliminarProductoPedido.eliminarProductoPedido(req, resp);
  }
);

productoPedidoRouter.put(
  "/editarSeguimientos",
  /*[verificaToken],*/
  (req: Request, resp: Response) => {
    const editarSeguimientos = new ProductoPedido();
    editarSeguimientos.editarSeguimientos(req, resp);
  }
);
