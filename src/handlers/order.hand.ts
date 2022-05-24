import { createo , storeo ,showo , deleto , addproduct} from "../models/orders.model";
import express, { Request, Response } from 'express';
import { vf } from "./jwthelp";
import { order } from "../models/orders.m";


const storeoh = async (req: Request, res: Response) => {
    try {
      vf(req);
      console.log('1')
      const order = await storeo();
      console.log('2')
      res.send(order);
      console.log('3')

    } catch (error) {
      res.status(401).json("error");
    }
  };
  
const showoh = async (req: Request, res: Response) => {
    try {
      const id = req.body.id as unknown as number;
      const order = await showo(id);
      vf(req, order.user_id);
      res.json(order);
    } catch (error) {
      res.status(401).json("error");
    }
  };
const createoh = async (req: Request, res: Response) => {
    try {
      console.log('1')
      const {user_id, status} = req.body;
      console.log('2'+ user_id +status)
  
      vf(req, user_id);
      console.log('3')
      const order: order = { user_id, status };
      console.log('4')
      const n_order = await createo(order);
      console.log('5')
      res.json(n_order);
    } catch (error) {
      res.status(401).json("error");
    }
  };
const deleteoh = async (req: Request, res: Response) => {
    try {
      const id = req.body.id as unknown as number;
      const order = await showo(id);
      vf(req, order.user_id);
      const d_order = await deleto(id);
      res.send(d_order);
    } catch (error) {
      res.status(401).json("error");
        }
  };
  
const addproducth = async (_req: Request, res: Response) => {
    const order_id: number = Number(_req.params.id);
    const product_id: number = _req.body.product_id;
    const quant: number = parseInt(_req.body.quant);
  
    try {
      const add_product = await addproduct(quant, order_id, product_id);
      res.json(add_product);
    } catch (err) {
      res.status(400).json("error");
    }
  };
  export {showoh , storeoh , createoh, deleteoh ,addproducth}