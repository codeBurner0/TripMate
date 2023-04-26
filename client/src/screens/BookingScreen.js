import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2';
import Moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';

const BookingScreen = () => {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();

  let { roomsid, fromdate, todate } = useParams();
  const fd = Moment(fromdate, 'DD-MM-YYYY')
  const td = Moment(todate, 'DD-MM-YYYY')

  const totaldays = Moment.duration(td.diff(fd)).asDays() + 1
  const [totalamount, settotalamount] = useState();


  useEffect(() => {

    if(!localStorage.getItem('currentUser')){
      window.location.href = '/login'
    }
    const fetchData = async () => {
      try {
        setloading(true)
        const data = (await axios.post('http://localhost:5000/api/rooms/getallroomsbyid', { roomsid: roomsid })).data
        setroom(data.room);
        settotalamount(data.room.rentperday * totaldays)
        //console.log(data.room);
        setloading(false)

      } catch (error) {
        seterror(true)
        console.log(error);
        setloading(false)
      }
    };
    fetchData();
  }, [roomsid]);


  // async function bookRoom() {
    
  // }

  async function onToken(token){
    console.log(token)
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    }

    try {

      setloading(true);
      const result = await axios.post('http://localhost:5000/api/booking/bookroom', bookingDetails);
      setloading(false);
      Swal.fire('Congratulations' , 'Your room booked successfully' , 'success').then(result=>{
        if(result.value){
          window.location.href = '/profile'
        }
      })
      console.log(result)
    } catch (error) {
      seterror(true)
      console.log(error);
      setloading(false)
      Swal.fire('Oops', 'Something went wrong', 'error');
    }

  }

  return (
        <div className="landing2">
      {loading ? (<Loader />) : room ? (<div>
        <div className="row justify-content-center bs" >
          <div className="col-md-6" >
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className="bigimg" />
          </div>

          <div className="col-md-6">

            <div style={{ textAlign: 'right' }}>

              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                <p>From Date : {fromdate}</p>
                <p>To Date : {todate}</p>
                <p>Max Count : {room.maxcount}</p>
              </b>
            </div>

            <div style={{ textAlign: 'right' }}>
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total Days : {totaldays} </p>
                <p>Rent per day : {room.rentperday}</p>
                <p>Total Amount : {totalamount}</p>
              </b>

            </div>

            <div style={{ float: 'right' }}>
              
              <StripeCheckout
                amount = { totalamount*100}
                token={onToken}
                currency='INR'
                stripeKey="pk_test_51MxSFxSDImWCEH67GxHRodFinMqg6arUcXOZcoQjski6DEibHE6cAbaqnabOkgKQKNVJ8zp8FInbZqR5Wfw7Gl5A00iJXbEUSW"
              >
              <button className="btn btn-primary" >Pay Now</button>
              </StripeCheckout>
            </div>

          </div>
        </div>


      </div>) : (<Error />)}
    </div>

    
  );
}

export default BookingScreen;

