const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController');
const authenticateJWT = require('../../middlewares/authenticateJWT');
const { userValidationRules, validate } = require('../../middlewares/validation');

// Login route
router.post('/login', userValidationRules(), validate, userController.login);
// Create User
router.post('/', userValidationRules(), validate, userController.createUser);
// Get All Users
router.get('/', authenticateJWT, userController.getAllUsers);
// Get User by ID
router.get('/:id', authenticateJWT, userController.getUserById);
// Update User
router.put('/:id', authenticateJWT, userController.updateUser);
// Delete User
router.delete('/:id', authenticateJWT, userController.deleteUser);

module.exports = router;
