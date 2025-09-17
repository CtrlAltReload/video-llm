import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.get('/', userController.getAllUsers);                   
router.get('/:id', userController.getUserById);                
router.post('/', userController.createUser);                   
router.put('/:id', userController.updateUser);                 
router.delete('/:id', userController.deleteUser);              
router.get('/deleted/all', userController.getDeletedUsers);         
router.put('/:id/restore', userController.restoreUser);            
router.delete('/:id/permanent', userController.permanentlyDeleteUser); 

export default router;
