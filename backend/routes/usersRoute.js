import { Router } from "express";
import { getalluser, getloginuser,getregisteruser} from "../controller/UserController.js";

const router  = Router()

router.post("/register", getregisteruser);
router.post("/login", getloginuser);
router.get("/getallusers" , getalluser)

export default router;