import React from 'react'
import hotellogo from '../images/Hotel.png'


function NavBar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(currentUser)

    function logout() {
        localStorage.removeItem('currentUser')
        window.location.reload();
        window.location.href = '/login';
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg " style={{margin:'0px'}}>
                <img src={hotellogo} alt="" style={{height:'50px' , width:'50px' , marginRight:'5px'}}/>
                <a class="navbar-brand" href="/home">The Hotel Hub</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon" ><i class="fa-solid fa-bars" style={{ color: "#ffffff" }}></i></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav" id="text">
                        {user ? (<>
                            <div class="dropdown">
                                <button style={{ backgroundColor: 'rgb(59, 52, 52)' }} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class=" fa fa-user" style={{ margin: '3px', padding: '3px' }}></i>
                                    {user.name}
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="/profile"> Profile </a>
                                    <a class="dropdown-item" href="#" onClick={logout}> Log out</a>
                                </div>
                            </div>
                        </>) : (<>
                            <li class="nav-item ">
                                <a class="nav-link" href="/register"><i class="bi bi-arrow-down-square"></i> Register</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/login" ><i class="bi bi-box-arrow-in-right"></i> Login</a>
                            </li>
                        </>)}

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
