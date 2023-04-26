import React, {useEffect , useState}from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from "../components/Loader";
import Swal from 'sweetalert2';

function AdminScreen() {

  const useradmin = JSON.parse(localStorage.getItem('currentUser')).isAdmin;

  useEffect(()=>{
    if(!useradmin){
        window.location.href= "/home";
    }
})

//   useEffect(() => {
//     console.log(JSON.parse(localStorage.getItem('currentUser')).isAdmin)
//     if(JSON.parse(localStorage.getItem('currentUser')).isAdmin){
//       console.log(JSON.parse(localStorage.getItem('currentUser')).isAdmin)
//         window.location.href="/admin"
//     }
//     window.location.href="/home"
//     // else if((JSON.parse(localStorage.getItem('currentUser')).isAdmin) === true){
//     //   window.location.href="/admin"
//     // }

// });
 

  return (
    <div className='landing2' style={{height:'582px'}}>
        <div className=' ml-3  mr-3 bs' style={{marginTop:'5px'}}>
        <h2 className='text-center' style={{fontSize:'30px' }}><b> Admin Panel </b></h2>
       <Tabs defaultActiveKey='1'>
            <Tabs.TabPane tab="Booking" key="1">
             <Bookings/>
             </Tabs.TabPane>
            <Tabs.TabPane tab="Rooms" key="2">
             <Rooms/>
            </Tabs.TabPane>
            <Tabs.TabPane tab=" Add Room" key="3">
             <Addroom/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="User" key="4">
             <Users/>
            </Tabs.TabPane>
           </Tabs>
    </div>
    </div>
  
  );

}

export default AdminScreen

//Booking list Component

export function Bookings(){

    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            setloading(true)
            const rooms = await (await axios.post('http://localhost:5000/api/booking/getallbookings')).data;
            //const rooms = (await axios.post("http://localhost:5000/api/booking/getbookingsbyuserid" , {userid : user._id})).data;
            console.log(rooms);
            setbookings(rooms);
            setloading(false)
    
          } catch (error) {
            console.log(error);
            setloading(false);
            seterror(error)
          }
        };
        fetchData();
      }, []);


    return(
        <div className='row'>
         <div className='col-md-12'>

         <h1>Bookings</h1>
            {loading && (<Loader/>)}
            <table class='table table-bordered table-dark'>
                <thead >
                    <tr>
                        <th>Booking Id</th>
                        <th>User Id</th>
                        <th>Room</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                {bookings.length && ( bookings.map(booking=>{
                    return <tr>
                        <td>{booking._id}</td>
                        <td>{booking.userid}</td>
                        <td>{booking.room}</td>
                        <td>{booking.fromdate}</td>
                        <td>{booking.todate}</td>
                        <td>{booking.status}</td>
                    </tr>
                }))}
                </tbody>
            </table>

            
         </div>
            
        </div>
    )
 }

 //Rooms list Component

 export function Rooms(){

    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            setloading(true)
            const data = (await axios.get('http://localhost:5000/api/rooms/getallrooms')).data
           // const rooms = await (await axios.post('http://localhost:5000/api/rooms/getallrooms')).data;
            //const rooms = (await axios.post("http://localhost:5000/api/booking/getbookingsbyuserid" , {userid : user._id})).data;
            console.log(rooms);
            setrooms(data.rooms);
            setloading(false)
    
          } catch (error) {
            console.log(error);
            setloading(false);
            seterror(error)
          }
        };
        fetchData();
      }, []);


    return(
        <div className='row'>
         <div className='col-md-12'>
        
         <h1>Rooms</h1>
          {loading && (<Loader/>)}
            
            <table class='table table-bordered table-dark'>
                <thead >
                    <tr>
                        <th>Room Id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Rent per day</th>
                        <th>Max Count</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>

                <tbody>
                {rooms.length && ( rooms.map(room=>{
                    return <tr>
                        <td>{room._id}</td>
                        <td>{room.name}</td>
                        <td>{room.type}</td>
                        <td>{room.rentperday}</td>
                        <td>{room.maxcount}</td>
                        <td>{room.phonenumber}</td>
                    </tr>
                }))}
                </tbody>
            </table> 
         </div>
            
        </div>
    )
 }


 //User list Component

 export function Users(){
    const [users, setusers] = useState([])
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            setloading(true)
            const data = (await axios.get('http://localhost:5000/api/users/getallusers')).data
            console.log(data);
            setusers(data);
            setloading(false)
    
          } catch (error) {
            console.log(error);
            setloading(false);
            seterror(error)
          }
        };
        fetchData();
      }, []);
    return(
      <div className='row'>
         <div className='col-md-12'>
         
         <h1>Users</h1>
         {loading && (<Loader/>)}
         <table class='table table-bordered table-dark'>
                <thead >
                    <tr>
                        <th>User</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
                 {users && (users.map( user=>{
                  return <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                 }))}
                </tbody>
            </table> 
         </div>
            
        </div>
    )
 }

 //Add Room Component

 export function Addroom(){

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const[name, setname] = useState('');
  const[rentperday , setrentperday] = useState();
  const[maxcount, setmaxcount] = useState('');
  const[description , setdescription] = useState();
  const[phonenumber, setphonenumber] = useState('');
  const[type , settype] = useState();
  const[imageurl1 , setimageurl1] = useState();
  const[imageurl2 , setimageurl2] = useState();
  const[imageurl3 , setimageurl3] = useState();

  async function addroom(){

    const newroom={
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls:[imageurl1 , imageurl2 , imageurl3]
    }

    try {
      
      setloading(true)
      const result = await(await axios.post('http://localhost:5000/api/rooms/addroom' , newroom)).data
      console.log(result)
      setloading(false)
      Swal.fire('Congrats' , 'New Room Has successfully added' , 'success').then(result=>{
        window.location.href='/home';
      })

    } catch (error) {
      console.log(error)
      setloading(false);
      seterror(error)
      Swal.fire('oops' , 'Something went wrong' , 'error')

    }
  }


  return(
    <div className="row">
         {loading && (<Loader/>)}
     <div className="col-md-5 " >
     
      <input  type="text" className='form-control' placeholder='room name' 
        value={name}  onChange={(e)=>{setname(e.target.value)}}
      />
      <input type="number" className='form-control' placeholder='rentperday' 
        value={rentperday}  onChange={(e)=>{setrentperday(e.target.value)}}
      />
      <input type="number" className='form-control' placeholder='maxcount'
      value={maxcount}  onChange={(e)=>{setmaxcount(e.target.value)}} />
      <input type="text" className='form-control' placeholder='description' 
        value={description}  onChange={(e)=>{setdescription(e.target.value)}}
      />
      <input type="number" className='form-control' placeholder='phonenumber'
      value={phonenumber}  onChange={(e)=>{setphonenumber(e.target.value)}} />

     </div>

     <div className='col-md-5'>
     <input type="text" className='form-control' placeholder='type'
     value={type}  onChange={(e)=>{settype(e.target.value)}}/>
     <input type="text" className='form-control' placeholder='Image url1'
     value={imageurl1}  onChange={(e)=>{setimageurl1(e.target.value)}} />
     <input type="text" className='form-control' placeholder='Image url2'
     value={imageurl2}  onChange={(e)=>{setimageurl2(e.target.value)}} />
     <input type="text" className='form-control' placeholder='Image url3'
     value={imageurl3}  onChange={(e)=>{setimageurl3(e.target.value)}} />

     <div className='text-right'>
      <button className='btn btn-primary mt-2' onClick={addroom}> Add Room</button>
     </div>

     </div>

    </div>
  )
 }