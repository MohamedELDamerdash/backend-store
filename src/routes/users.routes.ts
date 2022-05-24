import { Router } from 'express';
import { showh , storeh , deleth , createh , authenticateh } from '../handlers/users.hand';
const usersRouter = Router();

usersRouter.get('/users', storeh);
usersRouter.get('/users/:id', showh);
usersRouter.post('/users', createh);
usersRouter.delete('/users', deleth);
usersRouter.post('/users/authenticate', authenticateh);

export default usersRouter;