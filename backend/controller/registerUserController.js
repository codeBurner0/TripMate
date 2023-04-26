import { compareSync, hashSync } from "bcryptjs";
import  Users from "../models/user";

export const getregisteruser = async (req, res) => {
  const {name,email,password} = req.body;
  let user;
  try {
    user = new Users({name , email , password});
    await user.save()
    console.log('registered successful')
    //res.send('User registered Successfully') 
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(201).json({ user });
};