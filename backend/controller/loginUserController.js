import { compareSync, hashSync } from "bcryptjs";
import  Users from "../models/user";
// const rooms = require( "../models/room")

export const getloginuser = async (req, res) => {

  const {email , password} = req.body;
  let user;
  let temp;
  try {
    user = await Users.findOne({email : email , password : password});
    
   // console.log(room)
    //res.send(room)
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Login failed" });
  }
  temp ={
     name : user.name,
     email : user.email,
     _id : user._id
     
   }
  return res.status(200).json( user );
};