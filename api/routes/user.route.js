import express from "express";
import { test,updateUser,deleteUser,signout,getUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router();  

router.post('/signout',signout);
router.get('/test',test);
router.use(verifyToken);
router.put('/update/:userId',updateUser);
router.delete('/delete/:userId',deleteUser);
router.get('/getusers',getUsers);

export default router;