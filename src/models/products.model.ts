    import client from "../utils/database";
    import { product } from "./products.m";

    export const storep =async (): Promise<product[]> => {
        try {
          const conn = await client.connect();
          const sql = 'SELECT * FROM products';
          const result = await conn.query(sql);
          conn.release();
          return result.rows;
        } catch (err) {
          throw new Error(` couldn't get the product ${err}`);
        }
    }

 export const showp =async (id: number): Promise<product>=> {
        try {
          const sql = 'SELECT * FROM products WHERE id=($1)';
    
          const conn = await client.connect();
    
          const result = await conn.query(sql, [id]);
    
          conn.release();
    
          return result.rows[0];
        } catch (err) {
          throw new Error(`Couldn't find product ${id}. Error: ${err}`);
        }
      }
export const createp =async (p: product): Promise<product> =>{
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [p.name, p.price]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Couldn't add new product. Error: ${err}`);
    }
  }
  export const deletp= async (id: number): Promise<product>=> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Couldn't delete the product ${id}. Error: ${err}`);
    }
  }
