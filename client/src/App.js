import "./App.css";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import BookingScreen from "./screens/BookingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminScreen from "./screens/AdminScreen";
import LandingScreen from "./screens/LandingScreen";
function App() {
  const navigate=useNavigate()
  const [data, setData] = useState({
    _id: "660430fe74d07d6ebaba919f",
    firstName: "Ankit",
    lastName: "Anand",
    email: "ankit@gmail.com",
    phone: 7078259655,
    __v: 0,
  });

  useEffect( () => {
    const params = new URLSearchParams(window.location.search);
    const dataFromFirstApp = params.get("data");
    if (dataFromFirstApp) {
      localStorage.clear();
        localStorage.setItem("myData", dataFromFirstApp);
        setData(JSON.parse(localStorage.getItem("myData")));
        navigate("/home");
    }
  }, []);

  return (
    <div className="App">
      <NavBar name={data.firstName} />

      <Routes>
        <Route path="/home" exact element={<HomeScreen />} />
        <Route
          path="/book/:roomsid/:fromdate/:todate"
          element={<BookingScreen />}
        />
        {/* <Route  path ="/register" exact element= {<RegisterScreen/>} />
    <Route  path ="/login" exact element= {<LoginScreen/>} /> */}
        <Route
          path="/profile"
          element={
            <ProfileScreen
              name={data.firstName}
              phone={data.phone}
              email={data.email}
            />
          }
        />
        <Route path="/admin" element={<AdminScreen />}></Route>
        <Route path="/" element={<HomeScreen />}></Route>
      </Routes>
    </div>
  );
}

export default App;
