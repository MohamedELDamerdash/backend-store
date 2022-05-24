import express, { Request, Response } from 'express';
import { show,create,store,delet,authenticate } from '../models/users.model';
import { vf , sg  } from './jwthelp';
import { users } from '../models/users.m';

 const storeh = async (req: Request, res: Response) => {
    try {
      vf(req);
      const user = await store();
      res.json(user);
    } catch (err) {
      res.status(401).json("error");
    }
  };
  const showh = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      vf(req, id);
      const user = await show(id);
      res.json(user);
    } catch (err) {
      res.status(401).json("error");;
    }
  };
  
  const createh = async (req: Request, res: Response) => {
    console.log('4');
    try { const user: users = {
        lname: req.body.lname,
        fname: req.body.fname,
        password: req.body.password
      };
      console.log('1');
      console.log(user);      
      const n_user = await create(user);
      console.log('2');
  
      const tk = sg(Number(n_user.id));
      console.log('3');

      res.json(tk);
    } catch (err) {
      res.status(401).json("error");
    }
  };
  
  const deleth = async (req: Request, res: Response) => {
    try {
      const id = req.body.id as unknown as number;
      vf(req, id);
      const delett = await delet(id);
      res.json(delett);
    } catch (err) {
      res.status(401).json("error");
      }
  };
  
 const authenticateh = async (req: Request, res: Response) => {
    const user: users = {
      fname: req.body.fname,
      lname: req.body.lname,
      password: req.body.password,
    };
    try {
      const use = await authenticate(user.fname, user.lname, user.password);
      if (use === null) {
        res.status(401);
        res.json(`No Exsist User :${user.fname} ${user.lname}` );
      } else {
        const tk = sg(Number(user.id));
        res.json(tk);
      }
    } catch (error) {
      res.status(400).json("error");
    }
  };

  export {storeh , showh ,createh ,deleth,authenticateh};