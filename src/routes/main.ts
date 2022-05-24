import { Router } from "express";
import usersRouter from "./users.routes";
import productRouter from "./product.routes";
import orderRouter from "./order.routes";
const router = Router();

router.use("/", usersRouter);

router.use("/", productRouter);

router.use("/",orderRouter); 
export default router;