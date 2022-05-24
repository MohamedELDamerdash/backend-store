import supertest from "supertest";
import { JwtPayload, verify } from "jsonwebtoken";
import app from "../../server";
import { users } from "../../models/users.m";
const req= supertest(app);

describe('testing handler endpoint /users', ()=>{
    const htestuser:users ={
        id: 1,
        fname: "moh",
        lname: "amed",
        password: "12345",
    };
    let  test_t: string;
    let id: number;
    it('testing the create endpoint to create user', async()=>{
        await req
            .post('/users')
            .send({fname: htestuser.fname, lname: htestuser.lname, password: htestuser.password})
            .expect(200)
            .then((res)=>{
                test_t= res.body;
                const djwt=verify(test_t, process.env.secret_t as string) as JwtPayload;
                id=djwt.user.userId;
            });
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
            .set('Authorization', `Bearer jsgjrijgtihyjtyiq`)
            .expect(401);
    });

    it('testing the show endpoint with the right token and right id', async()=>{
        await req
            .get(`/users/${id}`)
            .set('Authorization', `Bearer ${test_t}`)
            .expect(200);
    });
    it('testing the show endpoint with the wrong token and right id', async()=>{
        await req
            .get(`/users/${id}`)
            .set('Authorization', `Bearer jsgjrijgtihyjtyiq`)
            .expect(401);
    });

    it('testing the delete endpoint to delete the htestuser', async()=>{
        await req
            .delete('/users')
            .send({id: id})
            .set('Authorization', `Bearer ${test_t}`)
            .expect(200);
    });
    it('testing the delete endpoint to delete the htestuser with the wrong token', async()=>{
        await req
            .delete('/users')
            .send({id: id})
            .set('Authorization', `Bearer oivkeikiuhj695fdlw`)
            .expect(401);
    });

});