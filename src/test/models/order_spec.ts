import { users } from "../../models/users.m";
import { store , show , create ,delet } from "../../models/users.model";
import { order } from "../../models/orders.m";
import { storeo , showo , createo , deleto ,addproduct} from "../../models/orders.model";
import { product } from "../../models/products.m";
import { storep , showp , createp ,deletp } from "../../models/products.model";

const  order_t: order={
    user_id: 0,
    status:"complete"
};
let  n_order: order;

const  user_t: users={
    fname: "moh",
    lname: "ahmed",
    password: "12345"
};
let tuser: users;

const  product_t: product={
    name: "pepssi",
    price: 5
};

let  test_p: product;
let product_id: number;

describe("testing order model definition", ()=>{
    it ('should have store method',()=>{
        expect(storeo).toBeDefined();
    });
    it ('should have show method',()=>{
        expect(showo).toBeDefined();
    });
    it ('should have create method',()=>{
        expect(createo).toBeDefined();
    });
    it ('should have delete method',()=>{
        expect(deleto).toBeDefined();
    });

    it ('should have an add product method',()=>{
        expect(addproduct).toBeDefined();
    });

});

describe("testing order model functionality", ()=>{
    beforeAll(async()=>{
        tuser= await create(user_t) ;
        if(tuser.id){
            order_t.user_id=tuser.id;
            
        };
        test_p= await createp(product_t);
        if(test_p){
            product_id= test_p.id as number;
        }
    });

    afterAll(async()=>{
        await delet(tuser.id as number) ;
        await deletp(product_id) ;
    })

    it('the create function should add an order', async()=>{
        n_order= await createo(order_t);
        expect({
            user_id: Number(n_order.user_id), 
            status: n_order.status
        }).toEqual({
            user_id: order_t.user_id, 
            status: order_t.status
        });
    });

    it('the index method should return the order we created', async()=>{
        const listo= await storeo()
        expect(listo).toContain(n_order);
    });

    it('the show method should return the order with that id', async()=>{
        const thatorder= await showo(tuser.id as number)
        expect(thatorder).toEqual(n_order);
    });


    it('the delete function should delete the order whith that id so the list of orders be empty', async()=>{
        await deleto(n_order.id as number);

        const listo= await storeo();
        expect(listo).toEqual([]);
    });

});


