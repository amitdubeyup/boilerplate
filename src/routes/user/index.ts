import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, login } from '../../controllers/user/userController';
import { authenticateJWT } from '../../middlewares/authenticateJWT';

const router = Router();

router.post('/login', login);
router.post('/', createUser);
router.get('/', authenticateJWT, getAllUsers);
router.get('/:id', authenticateJWT, getUserById);
router.put('/:id', authenticateJWT, updateUser);
router.delete('/:id', authenticateJWT, deleteUser);

export default router;
