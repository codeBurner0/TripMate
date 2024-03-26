import pkg from 'bcryptjs';
const { compareSync, hashSync } = pkg;
import  Users from "../models/user.js";
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


export const getalluser = async (req, res) => {
  try{
      const users = await Users.find()
      res.send(users)
  }
  catch(error){
      console.log(error)
      return res.status(400).json({error});
  }
};