import { Router } from 'express';
import { storeoh , createoh , showoh ,deleteoh ,addproducth} from '../handlers/order.hand';
const orderRouter = Router();

orderRouter.get('/orders', storeoh);
orderRouter.get('/orders/:id', showoh);
orderRouter.post('/orders', createoh);
orderRouter.delete('/orders', deleteoh);
orderRouter.post('/orders/addproduct', addproducth);


export default orderRouter;