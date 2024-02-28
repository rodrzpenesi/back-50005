import {Router} from 'express'
import { productModel } from "../../models/products.model.js";
import mongoose from "mongoose";
import CartModel from "../../models/carts.model.js";


export class Producto {
  constructor(title, description, price, code, stock, status, category, thunbnail) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.code = code;
    this.stock = stock;
    this.status = status;
    this.category = category;
    this.thunbnail = thunbnail;
  }
}

export class ProductMongoManager {

        async getProducts1(limit = 10, page = 1, query = '', sort = '') {
            try {
              const [code, value] = query.split(':');
          
              const parseProductos = await productModel.paginate({[code] : value}, {
                limit,
                page,
                sort : sort ? {price: sort} : {}
              });
              parseProductos.payload = parseProductos.docs;
              delete parseProductos.docs;
              return {message: "OK" , ...parseProductos}
            } catch (e) {
              return {message: "ERROR" , rdo: "No hay productos"}}
          }}