import { compareSync, hashSync } from "bcryptjs";
import  Rooms from "../models/room";
// const rooms = require( "../models/room")

export const getallrooms = async (req, res) => {
  let rooms;
  try {
    rooms = await Rooms.find();
  } catch (err) {
    return console.log(err);
  }

  if (!rooms) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ rooms });
};

//module.exports = getallrooms