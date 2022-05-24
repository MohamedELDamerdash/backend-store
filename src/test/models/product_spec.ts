import { product } from "../../models/products.m";
import { storep  ,showp ,createp ,deletp } from "../../models/products.model";
// const product_t :product={
//     name: "mentous",
//     price: 5
// } ;
// let product: product;


const testproduct :product={
    name: "prod1",
    price: 333
} ;
let products: product;


describe("testing product model definition", ()=>{
    it ('should have index method',()=>{
        expect(storep).toBeDefined();
    });
    it ('should have show method',()=>{
        expect(showp).toBeDefined();
    });
    it ('should have create method',()=>{
        expect(createp).toBeDefined();
    });
    it ('should have delete method',()=>{
        expect(deletp).toBeDefined();
    });

});

describe("testing product model functionality", ()=>{

    it('the create function should add a product', async()=>{
        products= await createp(testproduct);
        expect({
            name: products.name, 
            price: products.price
        })
        .toEqual({
            name: testproduct.name, 
            price: testproduct.price
        });
    });
    it('the index method should return the product we created', async()=>{
        const listp= await storep()
        expect(listp).toContain(products);
    });
    it('the show method should return the product with that id', async()=>{
        const thatproduct= await showp(products.id as number)
        expect(thatproduct).toEqual(products);
    });
    it('the delete function should delete the product whith that id so the list of products be empty', async()=>{
        await deletp(products.id as number)

        const listp= await storep();
        expect(listp).toEqual([]);
    });


});

