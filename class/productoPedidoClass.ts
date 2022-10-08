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
    const pedido = new mongoose.Types.ObjectId(req.body.pedido);
    const cantidad: number = req.body.cantidad;
    const precio: number = req.body.precio;
    const itbms: boolean = req.body.itbms;

    const crearProductoPed = new productModel({
      producto,
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

    productModel
      .find({ pedido })
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

    productModel.findByIdAndDelete(
      _id,
      (err: CallbackError, productoPedidoDB: ProductoPedidoInterface) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: "Error al eliminar producto pedido",
            err,
          });
        } else {
          return resp.json({
            ok: true,
            productoPedidoDB,
          });
        }
      }
    );
  }

  editarSeguimientos(req: any, resp: Response): void {
    const idProdPed = new mongoose.Types.ObjectId(req.get("idProdPed"));
    const seg_disenio = req.body.seg_disenio;
    const seg_prod = req.body.seg_prod;

    const query = {
      idProdPed,
      seg_disenio,
      seg_prod,
    };

    productModel.findByIdAndUpdate(
      idProdPed,
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
          return resp.json({
            ok: true,
            productoPedidoDB,
          });
        }
      }
    );
  }
}
