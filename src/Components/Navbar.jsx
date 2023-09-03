import React from "react";
import "../assets/NavBar.css"
import logo from '../assets/images/LogoBear.png'


const NabBarBear = () => {

    return(
        <div className='navbar'>
        <div className='left-navbar'>
          <img className='logo-navbar' src={logo} alt="Logo" />
        </div>
        <div className='right-navbar'>
          <h5 className='btn-logout'>Volver</h5>
        </div>
      </div>
    )
}

export default NabBarBear