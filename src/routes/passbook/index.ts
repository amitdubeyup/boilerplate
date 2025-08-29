import { Router } from 'express';
import { creditPassbook, debitPassbook, getPassbook } from '../../controllers/passbook/passbookController';
import { authenticateJWT } from '../../middlewares/authenticateJWT';

const router = Router();

router.post('/credit', authenticateJWT, creditPassbook);
router.post('/debit', authenticateJWT, debitPassbook);
router.get('/', authenticateJWT, getPassbook);

export default router;
// ...existing code...
