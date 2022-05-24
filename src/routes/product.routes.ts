import { Router } from 'express';
import { showhp , storehp , delethp , createhp } from '../handlers/product.hand';
const productRouter = Router();

productRouter.get('/products', storehp);
productRouter.get('/products/:id', showhp);
productRouter.post('/products', createhp);
productRouter.delete('/products', delethp);

export default productRouter;