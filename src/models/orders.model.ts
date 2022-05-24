import client from "../utils/database";
import { order } from "./orders.m";
export const storeo =async (): Promise<order[]> =>{
    try{
        const conn = await client.connect();
        const sql ="SELECT * FROM orders";
        const result=await conn.query(sql);
        conn.release();
        return result.rows;
    }catch(err) {
        throw new Error(` couldn't get the order ${err}`);

    }

}

export const showo= async (user_id: number): Promise<order>=> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't find order from the user ${user_id}. Error: ${err}`
      );
    }
  }

export const createo= async (o: order): Promise<order>=> {
    try {
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const conn = await client.connect();
      console.log('1')
      
      const result = await conn.query(sql, [o.user_id, o.status]);
      console.log('1')
      
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Couldn't add new order. Error: ${err}`);
    }
  }

export const deleto = async (id: number): Promise<order>=> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to delete order Error: ${error}`);
    }
  }

 export const addproduct = async (
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<order>=> {
    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }

