import supertest from "supertest";
import app from "../../server";
import { JwtPayload, verify } from "jsonwebtoken";
import { product } from "../../models/products.m";
import { users } from "../../models/users.m";

const req =supertest(app);

describe('testing handler endpoint /products', ()=>{

    const  product_t: product={
        id: 1,
        name: "mentous",
        price: 5
    }
    const user: users={
        id: 1,
        fname: "moh",
        lname: "ahmed",
        password: "12345"
    };
    let  test_t: string;
    let id: number;
    let  product_id: number;

 
    beforeAll(async()=>{
        await req
            .post('/users')
            .send(user)
            .expect(200)
            .then((res)=>{
                test_t= res.body;
                const djwt=verify(test_t, process.env.secret_t as string) as JwtPayload;
                id=djwt.user.userId;

            });
    });
    afterAll(async()=>{
        await req
            .delete('/users')
            .send({id: id})
            .set('Authorization', `Bearer ${test_t}`)
            .expect(200);
        });

    it('testing the product create endpoint with the right token', async()=>{
        await req
            .post('/products')
            .send({
                name: product_t.name,
                price: product_t.price
            })
            .set('Authorization', `Bearer ${test_t}`)
            .expect(200)
            .then((res)=>{
                product_id= res.body.id;
                product_t.id= product_id;
            });
    });
    it('testing the create endpoint with the wrong token', async()=>{
        await req
            .post('/products')
            .send({
                name:String,
                price:Number
            })
            .set('Authorization', `Bearer kkbikbrobpdoplxcih`)
            .expect(401).then
        });

    it('testing the index endpoint with the right token', async()=>{
        await req
            .get('/users')
            .set('Authorization', `Bearer ${test_t}`)
            .expect(200);      
    });

    it('testing the index endpoint with the wrong token', async()=>{
        await req
            .get('/users')
            .set('Authorization', `Bearer ldldoveroghtbmgvms`)
            .expect(401);      
    });

    it('testing the show endpoint with the right token', async()=>{
        await req
            .get(`/users/${product_id}`)
            .set('Authorization', `Bearer ${test_t}`)
            .expect(200);      
    });
    it('testing the show endpoint with the wrong token', async()=>{
        await req
            .get(`/users/${product_id}`)
            .set('Authorization', `Bearer sdfghldolkjhhtbmgvms`)
            .expect(401);      
    });

    it('testing the delete endpoint with the right token', async()=>{
        await req
            .delete('/products')
            .send({id: product_id})
            .set('Authorization', `Bearer ${test_t}`)
            .expect(200);
    });
    it('testing the delete endpoint with the wrong token', async()=>{
        await req
            .delete('/products')
            .send({id: product_id})
            .set('Authorization', `Bearer ldevgbjmigkfoperoribmnj`)
            .expect(401);
    })

});
