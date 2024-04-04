import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Swal from "sweetalert2";

function AdminScreen() {
  const userEmail = JSON.parse(localStorage.getItem("myData")).email;
  useEffect(() => {
    if (userEmail!=="kivaagrawal@gmail.com") {
      window.location.href = "/home";
    }
    
  });
  return (
    <div className="landing1">
      <div className=" ml-3  mr-3 bs1">
        <h2 className="text-center" style={{ fontSize: "30px" }}>
          <b> Admin Panel </b>
        </h2>
        <Tabs defaultActiveKey="1" style={{ color: "black" }}>
          <Tabs.TabPane tab="Bookings" key="1">
            <Bookings />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Inventory" key="2">
            <Rooms />
          </Tabs.TabPane>
          <Tabs.TabPane tab=" Add Room" key="3">
            <Addroom />
          </Tabs.TabPane>
          <Tabs.TabPane tab="User" key="4">
            <Users />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminScreen;

//Booking list Component

export function Bookings() {
  const [hBookings, setHBookings] = useState([]);
  const [mBookings, setMBookings] = useState([]);
  const [dBookings, setDBookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const fetchBookings = await (
          await axios.post(
            "https://caregrid-hospital.vercel.app/api/booking/getallbookings"
          )
        ).data;
        const h = fetchBookings.filter((item) => item.type === "hospital");
        const m = fetchBookings.filter((item) => item.type === "medicine");
        const d = fetchBookings.filter((item) => item.type === "doctor");
        console.log(fetchBookings);
        setHBookings(h);
        setMBookings(m);
        setDBookings(d);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="row">
      <Tabs defaultActiveKey="1" style={{ color: "dark-gray" }}>
        <Tabs.TabPane tab="Hospitals Booking" key="1">
          <div className="col-md-12">
            <h1>Hospitals Bookings ({hBookings.length})</h1>
            {loading && <Loader />}
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Hospital Id</th>
                  <th>User Id</th>
                  <th>Hospital</th>
                  <th>Booking Date</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {hBookings.length &&
                  hBookings.map((booking) => {
                    return (
                      <tr>
                        <td>{booking._id}</td>
                        <td>{booking.userid}</td>
                        <td>{booking.room}</td>
                        <td>{booking.bookingdate}</td>
                        <td>{booking.fromdate}</td>
                        <td>{booking.todate}</td>
                        <td>{booking.status}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Medicines Booking" key="2">
          <div className="col-md-12">
            <h1>Medicines Bookings ({mBookings.length})</h1>
            {loading && <Loader />}
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Medicine Id</th>
                  <th>User Id</th>
                  <th>Hospital</th>
                  <th>MRP/PAck</th>
                  <th>Pack</th>
                  <th>Booking Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {mBookings.length &&
                  mBookings.map((booking) => {
                    return (
                      <tr>
                        <td>{booking._id}</td>
                        <td>{booking.userid}</td>
                        <td>{booking.room}</td>
                        <td>{booking.mrpperpack}</td>
                        <td>{booking.pack}</td>
                        <td>{booking.bookingdate}</td>
                        <td>{booking.totalamount}</td>
                        <td>{booking.status}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Doctors Booking" key="3">
          <div className="col-md-12">
            <h1>Doctors Bookings ({dBookings.length})</h1>
            {loading && <Loader />}
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Doctor Id</th>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Booking Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {dBookings.length &&
                  dBookings.map((booking) => {
                    return (
                      <tr>
                        <td>{booking._id}</td>
                        <td>{booking.userid}</td>
                        <td>{booking.room}</td>
                        <td>{booking.bookingdate}</td>
                        <td>{booking.totalamount}</td>
                        <td>{booking.status}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

//Rooms list Component

export function Rooms() {
  const [hospitals, setHospitals] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const hospitals = (
          await axios.get(
            "https://caregrid-hospital.vercel.app/api/rooms/getallrooms"
          )
        ).data;

        const medicines = (
          await axios.get(
            "https://caregrid-medicine.vercel.app/api/rooms/getallrooms"
          )
        ).data;

        const doctors = (
          await axios.get(
            "https://caregrid-doctors-ashen.vercel.app/api/rooms/getallrooms"
          )
        ).data;
        setHospitals(hospitals.rooms);
        setMedicines(medicines.rooms);
        setDoctors(doctors.rooms);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Hospitals ({hospitals.length})</h1>
        {loading && <Loader />}

        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Hospital Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent per day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>

          <tbody>
            {hospitals.length &&
              hospitals.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="col-md-12">
        <h1>Medicines ({medicines.length})</h1>

        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Medicine Id</th>
              <th>Name</th>
              <th>MRP/Pack</th>
              <th>Current Bookings</th>
            </tr>
          </thead>

          <tbody>
            {medicines.length &&
              medicines.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.mrpperpack}</td>
                    <td>{room.currentbookings.length}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="col-md-12">
        <h1>Doctors ({doctors.length})</h1>

        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Doctor Id</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Speciality</th>
              <th>Experience</th>
              <th>Current Bookings</th>
            </tr>
          </thead>

          <tbody>
            {doctors.length &&
              doctors.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.designation}</td>
                    <td>{room.speciality}</td>
                    <td>{room.experience}</td>
                    <td>{room.currentbookings.length}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//User list Component

export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (
          await axios.get(
            "https://caregrid-hospital.vercel.app/api/users/getallusers"
          )
        ).data;
        console.log(data);
        setusers(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.email}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//Add Room Component

export function Addroom() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState();
  const [maxcount, setmaxcount] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [experience, setExperience] = useState("");
  const [designation, setDesignation] = useState("");
  const [hospital, setHospital] = useState("");
  const [education, setEducation] = useState("");
  const [opdtiming, setOpdtiming] = useState("");
  const [description, setdescription] = useState();
  const [phonenumber, setphonenumber] = useState("");
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();
  const [imageurl3, setimageurl3] = useState();

  async function addHospital() {
    const newHospital = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type:"hospital",
      imageurls: [imageurl1, imageurl2, imageurl3],
    };

    try {
      setloading(true);
      const hospitalResult = await (
        await axios.post(
          "https://caregrid-hospital.vercel.app/api/rooms/addroom",
          newHospital
        )
      ).data;
      console.log("result",hospitalResult)
      setloading(false);
      Swal.fire(
        "Congrats",
        "A new Hospital has added successfully ",
        "success"
      ).then((result) => {
        window.location.href = "/admin";
      });
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
      Swal.fire("oops", "Something went wrong", "error");
    }
  }
  async function addMedicine() {
    const newMedicine = {
      name: name,
      mrpperpack: rentperday,
      description:description,
      imageurls: [imageurl1],
    };

    try {
      setloading(true);
      const MedicineResult = await (
        await axios.post(
          "https://caregrid-medicine.vercel.app/api/rooms/addroom",
          newMedicine
        )
      ).data;
      console.log(newMedicine)
      console.log(MedicineResult)
      setloading(false);
      Swal.fire(
        "Congrats",
        "A new Medicine has added successfully",
        "success"
      ).then((result) => {
        window.location.href = "/admin";
      });
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
      Swal.fire("oops", "Something went wrong", "error");
    }
  }
  async function addDoctor() {
    const newDoctor = {
      name,
      designation,
      opdfee:rentperday,
      experience,
      speciality,
      hospital,
      education,
      opdtiming,
      description,
      imageurls: [imageurl1]
    }
    
    try {
      setloading(true);
      const DoctorResult = await (
        await axios.post(
          "https://caregrid-doctors-ashen.vercel.app/api/rooms/addroom",
          newDoctor
        )
      ).data;
      setloading(false);
      Swal.fire(
        "Congrats",
        "A new Doctor has been added successfully",
        "success"
      ).then((result) => {
        window.location.href = "/admin";
      });
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
      Swal.fire("oops", "Something went wrong", "error");
    }
  }

  return (
    <Tabs defaultActiveKey="1" style={{ color: "dark-gray" }}>
      <Tabs.TabPane tab="Add Hospital" key="1" >
        <div className="row">
          {loading && <Loader />}

          <div className="col-md-5 ">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="rentperday"
              onChange={(e) => {
                setrentperday(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="maxcount"
              onChange={(e) => {
                setmaxcount(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="description"
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="phonenumber"
              onChange={(e) => {
                setphonenumber(e.target.value);
              }}
            />
          </div>

          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Image url1"
              onChange={(e) => {
                setimageurl1(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Image url2"
              onChange={(e) => {
                setimageurl2(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Image url3"
              onChange={(e) => {
                setimageurl3(e.target.value);
              }}
            />

            <div className="text-right">
              <button className="btn btn-primary mt-2" onClick={addHospital}>
                {" "}
                Add Hospital
              </button>
            </div>
          </div>
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Add Medicine" key="2" >
        <div className="row" >
          {loading && <Loader />}
          <div className="col-md-5 ">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="MRP per pack"
              onChange={(e) => {
                setrentperday(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
          </div>

          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Image url1"
              onChange={(e) => {
                setimageurl1(e.target.value);
              }}
            />

            <div className="text-right">
              <button className="btn btn-primary mt-2" onClick={addMedicine}>
                {" "}
                Add Medicine
              </button>
            </div>
          </div>
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Add Doctor" key="3" >
        <div className="row" >
          {loading && <Loader />}
          <div className="col-md-5 ">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Designation"
              onChange={(e) => {
                setDesignation(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Speciality"
              onChange={(e) => {
                setSpeciality(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Experience"
              onChange={(e) => {
                setExperience(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="opd fees"
              onChange={(e) => {
                setrentperday(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="description"
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
          </div>

          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Hospital"
              onChange={(e) => {
                setHospital(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Timings"
              onChange={(e) => {
                setOpdtiming(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Image url1"
              onChange={(e) => {
                setimageurl1(e.target.value);
              }}
            />

            <div className="text-right">
              <button className="btn btn-primary mt-2" onClick={addDoctor}>
                {" "}
                Add Medicine
              </button>
            </div>
          </div>
        </div>
      </Tabs.TabPane>
    </Tabs>
  );
}
