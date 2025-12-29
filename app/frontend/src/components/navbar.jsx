import React from 'react';
// import  "./navbar.css";
import NavCSS from "./css/navcss.js";
import { DockIcon,Dock } from "./ui/dock";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navbar() {
  const nag = useNavigate()
  const logoutuser = () =>{
    toast.info("you are successfully logout to you account");
    localStorage.removeItem("token");
    nag('/');    
  }
  return (
    <>
     <nav className={NavCSS.mainNavbar}>
        <ul className={NavCSS.ulContainer}>
          <li><Link to="/home" className={NavCSS.heroSection}>Home</Link></li>
          <li><Link to="/home/prof" className={NavCSS.heroSection}>Profile</Link></li>
          <li><Link to="/home/search" className={NavCSS.heroSection}>Search</Link></li>
          <li><Link to="/" className={NavCSS.heroSection}>Contact</Link></li>
          <li><Link to="/home/notfi" className={NavCSS.heroSection}>Notification</Link></li>
          <button className={NavCSS.Login_section} onClick={logoutuser}>LoginOut</button>
        </ul>
    </nav>
    </>
  );
}

export default Navbar;