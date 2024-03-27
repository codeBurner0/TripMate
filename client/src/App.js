import './App.css';
import {useState , useEffect} from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter , Route , Routes, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import LandingScreen from './screens/LandingScreen';

function App() {

  // const [user, setUser] = useState([]);
  // useEffect(() => {
  //   // Read the data passed from the first app
  //   const params = new URLSearchParams(window.location.search);
  //   const dataFromFirstApp = params.get("data");
  //   if ( localStorage.getItem("myData")==="null") {
  //     // Set the data into localStorage of the second app
  //     localStorage.setItem("myData", dataFromFirstApp);
  //   }
  //   setUser(JSON.parse(localStorage.getItem("myData")));
  // }, []);

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
