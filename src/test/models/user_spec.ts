import { users } from "../../models/users.m";
import { show , store ,create ,authenticate ,delet} from "../../models/users.model";
const user_t: users={
    fname: "moh",
    lname: "ahmed",
    password: "12345",
    id:1
} ;
let user: users;

describe("testing user model definition", ()=>{
    it ('should have store method',()=>{
        expect(store).toBeDefined();
    });
    it ('should have show method',()=>{
        expect(show).toBeDefined();
    });
    it ('should have create method',()=>{
        expect(create).toBeDefined();
    });
    it ('should have delet method',()=>{
        expect(delet).toBeDefined();
    });
    it ('should have authenticate method',()=>{
        expect(authenticate).toBeDefined();
    });

});


describe("testing user model functionality", ()=>{

    it('the create function should add a user',async ()=>{
        user= await create(user_t);
        expect({fname: user.fname, lname: user.lname}).toEqual({
            fname: user_t.fname,
            lname: user_t.lname
        });
    });
    
    it('the index method should return the user we created', async()=>{
        const listu= await store();
        expect(listu).toContain(user);
    });
    it('the show method should return the user with that id', async()=>{
        const thatuser= await show(user.id as number)
        expect(thatuser).toEqual(user);
    });
    it('the authenticate function should check the authentication', async()=>{
        const authuser: users|null= await authenticate(user.fname, user.lname, user.password)
        if (authuser) {
            const {fname, lname} = authuser
      
            expect(fname).toBe(user.fname),
            expect(lname).toBe(user.lname)
          }
      
    });
    it('the delete function should delete the user whith that id so the list of users be empty', async()=>{
        await delet(user.id as number)

        const listu= await store();
        expect(listu).toEqual([]);
    });
});
