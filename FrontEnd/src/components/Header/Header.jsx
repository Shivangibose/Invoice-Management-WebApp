import React from 'react'
import "./Header.css";
import ABCLogo from "../Images/ABCLogoFull.svg";


function Header() {
  return (
    <div className="head">
    <div className="head1">
    <img className="ABC" src={ABCLogo}></img>
    </div>   

    </div>
  )
}

export default Header
