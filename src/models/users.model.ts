import client from "../utils/database";
import { users } from "./users.m";
import bcrypt from 'bcrypt';
import conf from "../config/main";

export const store = async (): Promise<users[]> => {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(` couldn't get the users ${err}`);
    }
}

export const show =async (id: number): Promise<users> =>{
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't find user ${id}. Error: ${err}`);
    }
  }

 export const create= async (u: users): Promise<users> =>{
    try {
      const conn = await client.connect();

      const sql =
        'INSERT INTO users (fname, lname, password) VALUES($1, $2, $3) RETURNING *';
        console.log('4');
      const hash = bcrypt.hashSync(u.password + conf.us.PEPPERR, Number(conf.us.SALT_ROUNDS));
      console.log('3');
      console.log(hash);
      const result = await conn.query(sql,[u.fname,u.lname,hash])
      console.log('2');
      conn.release();
      console.log('1');
      return result.rows[0];
      
    } catch (err) {
      throw new Error(`Couldn't add new user. Error: ${err}`);
    }
  }
export const delet = async(id: number): Promise<users> => {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      console.log("1")
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Couldn't delete user ${id}. Error: ${err}`);
    }
  }
 export const authenticate = async(
    fname: string,
    lname: string,
    password: string
  ): Promise<users | null> =>{
    try {
      const conn = await client.connect();
      const sql = 'SELECT password FROM users WHERE fname=($1) and lname=($2)';
      const result = await conn.query(sql, [fname, lname]);
      const user = result.rows[0];
      if (user) {
        if (bcrypt.compareSync(password + conf.us.PEPPERR , user.password)) {
          return user;
        }
      }
      return null;
    } catch (error) {
      throw new Error(`Failed to sign in as user : ${error}`);
    }
  }

 