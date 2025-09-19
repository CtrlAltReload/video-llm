import { Router } from "express";
import * as userController from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", verifyToken, userController.getAllUsers); 

router.get("/:id", verifyToken, userController.getUserById);                

router.post("/", verifyToken, userController.createUser);                   

router.put("/:id", verifyToken, userController.updateUser);                 

router.delete("/:id", verifyToken, userController.deleteUser);              

router.get('/deleted/all', verifyToken, userController.getDeletedUsers);         

router.put("/:id/restore", verifyToken, userController.restoreUser);            

router.delete('/:id/permanent', verifyToken, userController.permanentlyDeleteUser); 

export default router;
