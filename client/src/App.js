import './App.css';
import {useState , useEffect} from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter , Route , Routes, Link, useNavigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import LandingScreen from './screens/LandingScreen';

function App() {
  const navigate=useNavigate()

// localStorage.clear();
// if(localStorage.getItem("myData")===null){
//   localStorage.clear()
// }
// const params = new URLSearchParams(window.location.search);
//     const dataFromFirstApp = params.get("data");
//     console.log(!localStorage.getItem("myData"))
//     if (!localStorage.getItem("myData")) {
//       console.log("internal");
//       localStorage.setItem("myData", dataFromFirstApp);
//     }




// localStorage.setItem("myData",)
  useEffect(() => {
    if(localStorage.getItem("myData")==='null'){
      localStorage.clear()
    }
    const params = new URLSearchParams(window.location.search);
    const dataFromFirstApp = params.get("data");
  //  if(JSON.parse(localStorage.getItem("myData"))?.email!==JSON.parse(dataFromFirstApp)?.email){
  //     localStorage.clear()
  //  }
   console.log("hiol")
    if (!localStorage.getItem("myData")) {
      console.log("internal");
      localStorage.setItem("myData", dataFromFirstApp);
      navigate('/home')
    }
  }, []);












  return (
    <div className="App">
        <NavBar/>

<Routes>
    <Route  path ="/home" exact element={<HomeScreen/>} />
    <Route path="/book/:roomsid/:fromdate/:todate" element={<BookingScreen />}/>
    {/* <Route  path ="/register" exact element= {<RegisterScreen/>} />
    <Route  path ="/login" exact element= {<LoginScreen/>} /> */}
    <Route  path ="/profile" element={<ProfileScreen />}/>
    <Route path="/admin" element={<AdminScreen/>}></Route>
    <Route path="/" element={<HomeScreen/>}></Route>
</Routes>

    </div>
  );
}

export default App;
