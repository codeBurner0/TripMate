import { Router } from "express";
const router = Router();
import Booking from '../models/booking.js'
//const Booking = require('../models/booking')
import Room from "../models/room.js";
import { v4 as uuidv4 } from 'uuid';

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MxSFxSDImWCEH67YT4K9A0fUxM5TBBmix99aNxOi1JPjitzK07zMfYPUQt3m06WGyVanT85yR2n7rOGoNCMyyWy00OIq7y6Tw');



router.post("/bookroom", async (req, res) => {
  const { room, userid, bookingdate ,fromdate, todate, totalamount, totaldays, token} = req.body
   
  try{
    console.log('1st')
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const payment = {
      amount: totalamount * 100,
      currency: 'usd',
      customer: customer.id,
      idempotency_key: uuidv4()
    }

   // console.log(payment)
     if(payment){
  
        const  newbooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid : userid,
          bookingdate: bookingdate,
          fromdate : fromdate,
          todate : todate,
          totalamount : totalamount,
          totaldays : totaldays,
          transactionId: '1234',
          detail:token
        })
        const booking = await newbooking.save();
    
        const roomtemp = await Room.findOne({ _id: room._id });
    
        roomtemp.currentbookings.push({ bookingid: booking._id, bookingdate: bookingdate,fromdate: fromdate , todate:todate, userid: userid  , Payamount : totalamount,  details :token , status : booking.status});
        console.log(roomtemp)
        await roomtemp.save();
        //res.send("Room booked ")
      }
    res.send('Payment Successful , Your room is booked')
  }
  catch(error){
    console.log(error)
    return res.status(400).json({error})
  }
  
  // try {
  //  const  newbooking = new Booking({
  //     room: room.name,
  //     roomid: room._id,
  //     userid,
  //     fromdate ,
  //     todate,
  //     totalamount,
  //     totaldays,
  //     transactionId: '1234'
  //   })
  //   const booking = await newbooking.save();

  //   const roomtemp = await Room.findOne({ _id: room._id });

  //   roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: fromdate , todate:todate, userid: userid  , status : booking.status});
  //   console.log(roomtemp)
  //   await roomtemp.save();

  //   res.send("Room booked ")
   
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).json({ err});
  // }

  // if (!newbooking) {
  //   return res.status(500).json({ message: "Unexpected Error Occured" });
  // }

  // return res.status(201).json({ newbooking });
});

router.post("/getbookingsbyuserid" ,async (req,res)=>{
  const userid = req.body.userid;

  try{
    const bookings = await Booking.find({userid:userid})
    res.send(bookings)
  }
  catch(err){
    return res.status(200).json({err})
    console.log(err)
  }
});

router.post("/cancelbooking" ,async (req,res)=>{

  const {bookingid , roomid} = req.body;

  try{
    const bookingitem = await Booking.findOne({_id:bookingid})
    bookingitem.status = 'cancelled'
    await bookingitem.save()
    const room = await Room.findOne({_id : roomid})

    const bookings = room.currentbookings

    const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)
    room.currentbookings = temp 

    await room.save()
    res.send('Your booking cancelled successfully')
  }
  catch(err){
    return res.status(200).json({err})
    console.log(err)
  }
});

router.post("/getallbookings" ,async (req,res)=>{

 // const {bookingid , roomid} = req.body;

  try{
    const bookings = await Booking.find()
    res.send(bookings)
  }
  catch(err){
    return res.status(200).json({err})
    console.log(err)
  }
});


export default router;
