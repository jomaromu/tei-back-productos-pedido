import { Request, Response } from "express";
import { CallbackError } from "mongoose";
const mongoose = require("mongoose");
import moment from "moment";
moment.locale("es");
import Server from "./server";

// Modelos
import productModel from "../models/producto-pedido-model";

// Interface
import { ProductoPedidoInterface } from "../interfaces/producto-pedido";

export class ProductoPedido {
  constructor() {}

  crearProductoPedido(req: any, resp: Response): void {
    const producto = new mongoose.Types.ObjectId(req.body.producto);
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    const idEmpresa: string = req.body.foranea;
    const pedido = new mongoose.Types.ObjectId(req.body.pedido);
    const cantidad: number = req.body.cantidad;
    const precio: number = req.body.precio;
    const itbms: boolean = req.body.itbms;

    const crearProductoPed = new productModel({
      producto,
      foranea,
      pedido,
      cantidad,
      precio,
      itbms,
    });

    crearProductoPed.save(
      (err: CallbackError, productoPedidoDB: ProductoPedidoInterface) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: "Error al crear el producto pedido",
            err,
          });
        } else {
          const server = Server.instance;
          server.io
            .in(idEmpresa)
            .emit("cargar-productos-pedidos", { ok: true });
          server.io.in(idEmpresa).emit("cargar-seguimiento", { ok: true });
          return resp.json({
            ok: true,
            productoPedidoDB,
          });
        }
      }
    );
  }

  obtenerProductosPedidos(req: any, resp: Response): void {
    const pedido = new mongoose.Types.ObjectId(req.get("pedido"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    productModel
      .find({ pedido, foranea })
      .populate("producto")
      .exec(
        (
          err: CallbackError,
          productosPedidos: Array<ProductoPedidoInterface>
        ) => {
          if (err) {
            return resp.json({
              ok: false,
              mensaje: "Error al obtener los productos pedidos",
              err,
            });
          } else {
            return resp.json({
              ok: true,
              productosPedidos,
            });
          }
        }
      );
  }

  eliminarProductoPedido(req: any, resp: Response): void {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
    const idEmpresa: string = req.get("foranea");

    productModel.findOneAndDelete(
      { _id, foranea },
      (err: CallbackError, productoPedidoDB: ProductoPedidoInterface) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: "Error al eliminar producto pedido",
            err,
          });
        } else {
          const server = Server.instance;
          server.io
            .in(idEmpresa)
            .emit("cargar-productos-pedidos", { ok: true });
          server.io.in(idEmpresa).emit("cargar-seguimiento", { ok: true });
          return resp.json({
            ok: true,
            productoPedidoDB,
          });
        }
      }
    );
  }

  editarSeguimientos(req: any, resp: Response): void {
    const _id = new mongoose.Types.ObjectId(req.body.idProdPed);
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    const seg_disenio = req.body.seg_disenio;
    const seg_prod = req.body.seg_prod;

    const query = {
      seg_disenio,
      seg_prod,
    };

    productModel.findOneAndUpdate(
      { _id, foranea },
      query,
      { new: true },
      (err: any, productoPedidoDB: any) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: "Error al editar el producto pedido",
            err,
          });
        } else {
          const server = Server.instance;
          server.io.emit("cargar-seguimiento", { ok: true });
          return resp.json({
            ok: true,
            productoPedidoDB,
          });
        }
      }
    );
  }
}
