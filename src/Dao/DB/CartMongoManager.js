import mongoose from "mongoose";
import CartModel from "../../models/carts.model.js";
import {productModel} from "../../models/products.model.js"

export class ProductCart {
  constructor(id, quantity, title) {
    this.id = id
    this.quantity = quantity
  }
}

export class CartMongoManager {
  #carts
  
  constructor(){
    this.#carts = [];
  }

  async getCarts() {
    try {
      const parseCarritos = await CartModel.find().lean()
      return (parseCarritos)
    } 
    catch (e) {
      return {message: "ERROR" , rdo: "No hay carritos"}
    }
  }

  async getCartById(id) {
    try
    {
      const cart=await CartModel.findOne({_id: id})
      if (cart) 
        return {message: "OK" , rdo: cart}
      else 
        return {message: "ERROR" , rdo: "El carrito no existe"}
    } 
    catch (e) {
      return {message: "ERROR" , rdo: "Error al obtener el carrito - " + e.message}
}}

  async getProductsCartById(id) {
    return await CartModel.findOne({ _id: id }).populate({
      path: 'products.product',
      model: 'products',
      options: { lean: { virtuals: true } },
    });}
  async addProductsInCart(cId, pId, quantity, title) {
    try {
      const cart = await CartModel.findOne({_id: cId});
      if(cart){
        const existingProducts = cart.products.find(product => product.product.toString() === pId);
        if(existingProducts){
          existingProducts.quantity += quantity;
        }
        else{
          cart.products.push({product: pId , quantity, title: title});
        }
        await cart.save();
        return true;
      }
      else{
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  async addCart(products) {
    try {
      const added = await CartModel.create(products)        
      return {message: "OK" , rdo: "Carrito dado de alta correctamente"}
    } 
    catch (e) {
      return {message: "ERROR" , rdo: "Error al agregar el carrito." + e.message}
    }
  }

  async deleteAllProductsInCart(id) {
    try {
     const deleted = await CartModel.updateOne({_id: id}, {
      products: []
     });
     if(deleted.modifiedCount > 0){
      return true;
     }
     else{
      return false;
     }
    } 
    catch (e) {
     console.error(e);
     return false;
    }
  }

  async deleteProductInCart(cId, pId){
    try {
      const result = await CartModel.updateOne({_id: cId}, {
        $pull: {products : {product: new mongoose.Types.ObjectId(pId)}}
      });
      if(result.modifiedCount > 0){
        return true;
      }
      else{
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateCart(cId, cart){
    try {
      const result = await CartModel.updateOne({_id: cId}, cart);
      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async updateProductInCart(cId, pId, quantity){
    if(!quantity){
      return false;
    }
    try {
      const cart = await CartModel.findOne({_id: cId});
      if(!cart){
        return false;
      }
      const product = cart.products.find(product => product.product.toString() === pId);
      if(!product){
        return false;
      }
      product.quantity = quantity;
      await cart.save();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

}