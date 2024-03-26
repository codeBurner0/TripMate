import  Rooms from "../models/room.js";

export const getallroomsbyid = async (req, res) => {
  const roomsid = req.body.roomsid;
  let room;
  try {
    room = await Rooms.findOne({_id : roomsid});
   // console.log(room)
    //res.send(room)
  } catch (err) {
    return console.log(err);
  }
  
  if (!room) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ room });
};

//module.exports = getallrooms