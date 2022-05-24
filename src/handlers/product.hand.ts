import express, { Request, Response } from 'express';
import { showp,createp,storep,deletp } from '../models/products.model';
import { vf  } from './jwthelp';
import { product } from '../models/products.m';

const storehp = async (req: Request, res: Response) => {
    try {
        vf(req);
        const product = await storep();
        res.json(product);
      } catch (error) {
        res.status(401).json("error");
      }
    };
  const showhp = async (req: Request, res: Response) => {
    try {
        vf(req);
        const id = Number(req.params.id);
        const product = await showp(id);
        res.json(product);
      } catch (error) {
        res.status(401).json("error");
      }
    };
  
  const createhp = async (req: Request, res: Response) => {
    try {
       vf(req);
        const product: product = {
          name: req.body.name,
          price: req.body.price,
        };
        const n_product = await createp(product);
        res.json(n_product);
      } catch (error) {
        res.status(401).json("error");
      }
    };
  const delethp = async (req: Request, res: Response) => {
    try {
        vf(req);
        const id = req.body.id;
        const delett = await deletp(id);
        res.json(delett);
      } catch (error) {
        res.status(401).json("error");
      }
    };
    export {showhp , storehp ,delethp ,createhp}