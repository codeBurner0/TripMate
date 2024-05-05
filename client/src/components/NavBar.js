import React from "react";
import logo from "../images/clogo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function NavBar({name}) {
  return (
    <div>
      <nav class="navbar navbar-expand-lg " style={{ margin: "0px" }}>
        <img
          src={logo}
          alt=""
          style={{ height: "50px", width: "70px", marginRight: "5px" }}
        />
        <Link class="navbar-brand" to="/home">
          CareGrid
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">
            <i class="fa-solid fa-bars" style={{ color: "#ffffff" }}></i>
          </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav" id="text">
            <>
              <div class="dropdown">
                <button
                  style={{ backgroundColor: "#2c5245" }}
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i
                    class=" fa fa-user"
                    style={{ margin: "3px", padding: "3px" }}
                  ></i>
                  {name}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link class="dropdown-item" to="/profile">
                    {" "}
                    Profile{" "}
                  </Link>
                </div>
              </div>
            </>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
