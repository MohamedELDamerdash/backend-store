import supertest from "supertest";
import app from "../../server";
import { JwtPayload, verify } from "jsonwebtoken";
import { order } from "../../models/orders.m";
import { users } from "../../models/users.m";
import { product } from "../../models/products.m";


const req= supertest(app);

describe('testing handler endpoint /orders', ()=>{

    const  order_t: order ={
        id:1,
        user_id: 0,
        status: 'done'
    };

    const user: users={
        fname: "moh",
        lname: "ahmed",
        password: "12345"
    };

    const product: product={
        name: "peppsi",
        price: 5
    };

    let  product_id: number;
    let  user_id: number;
    let  test_t: string;

    beforeAll(async()=>{
        await req
            .post('/users')
            .send(user)
            .expect(200)
            .then((res)=>{
                test_t= res.body;
                const djwt=verify(test_t, process.env.secret_t as string) as JwtPayload;
                user_id=djwt.user.userId;
                order_t.user_id=user_id;

            });
            await req
            .post('/products')
            .send({
                name: product.name,
                price: product.price
            })
            .set('Authorization', `Bearer ${test_t}`)
            .expect(200)
            .then((res)=>{
                product_id= res.body.id;
            });
            });

    afterAll(async()=>{
        await req
            .delete('/users')
            .send({id: user_id})
            .set('Authorization', `Bearer ${test_t}`)
            .expect(200);

            await req
            .delete('/products')
            .send({id: product_id})
            .set('Authorization', `Bearer ${test_t}`)
            .expect(200);

        });

        it('testing the order create endpoint with the right token', async()=>{
            await req
                .post('/orders')
                .send({
                    user_id: order_t.user_id,
                    status: order_t.status
                })
                .set('Authorization', `Bearer ${test_t}`)
                .expect(200)
                .then((res)=>{
                    order_t.id= res.body.id;
                });
         });
   
            it('testing the index endpoint with the right token', async()=>{
                await req
                    .get('/orders')
                    .set('Authorization', `Bearer ${test_t}`)
                    .expect(200);      
            });
        
            it('testing the show endpoint with the right token', async()=>{
                await req
                    .get(`/users/${order_t.id}`)
                    .set('Authorization', `Bearer ${test_t}`)
                    .expect(200);      
            });
            it('testing the delete endpoint with the right token', async()=>{
                await req
                    .delete('/orders')
                    .send({id: order_t.id})
                    .set('Authorization', `Bearer ${test_t}`)
                    .expect(200);
            });
        
});

