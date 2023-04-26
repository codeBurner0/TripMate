import { Router } from "express";
import { getloginuser} from "../controller/loginUserController";
import { getregisteruser } from "../controller/registerUserController";
import  User from "../models/user";

const router  = Router()

router.post("/register", getregisteruser);

router.post("/login", getloginuser);

router.get("/getallusers" , async (req, res) => {
    try{
        const users = await User.find()
        res.send(users)
    }
    catch(error){
        console.log(error)
        return res.status(400).json({error})
    }
})

export default router;