const express = require('express');
const router = express.Router();
const passbookController = require('../../controllers/passbook/passbookController');
const authenticateJWT = require('../../middlewares/authenticateJWT');
const { passbookValidationRules, validate } = require('../../middlewares/validation');

// Credit
router.post('/credit', authenticateJWT, passbookValidationRules(), validate, passbookController.credit);
// Debit
router.post('/debit', authenticateJWT, passbookValidationRules(), validate, passbookController.debit);
// Get passbook
router.get('/', authenticateJWT, passbookController.getPassbook);

module.exports = router;
