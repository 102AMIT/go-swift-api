import express from 'express';
import userController from '../../controllers/userController';

const router = express.Router();


router.delete('/', userController.deleteAllUsers);


router.delete('/:userId', userController.deleteUser);


router.get('/:userId', userController.getUser);

// TODO : changing the HTTP method here in pdf it is PUT request but for the good practice we need to use here POST 
router.post('/', userController.createUser);

// TODO : changing the HTTP method here, in pdf it is POST request but for the good practice we need to use here PUT 
router.put('/:userId', userController.updateUser);

export default router;
