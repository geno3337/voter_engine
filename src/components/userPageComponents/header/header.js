import { useState } from "react"



export default function Header(){

  const [showMobileNav,setShowMobileNav]=useState()

  function event (e) {
    setShowMobileNav(!showMobileNav)
  }



    return(
  <header id="header" className="fixed-top d-flex align-items-center">
    <div className="container d-flex align-items-center justify-content-between">

      <div className="logo">
        <h1 className="text-light"><a href="home"><span>VoterEngine</span></a></h1>
        {/* <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid"></a>--> */}
      </div>
      <nav id="navbar" className={`navbar  ${showMobileNav && 'navbar-mobile'}`}>
        <ul >
          <li><a className="nav-link  active" href="home" >Home</a></li>
          {/* <li><a className="nav-link " href="about" >About Us</a></li> */}
          <li><a className="nav-link " href="resultPage">Result</a></li>
          <li><a className="nav-link " href="userProfile">Profile</a></li>
          <li><a className="nav-link " href="logoutpage">Logout</a></li>
          {/* <li><a className="nav-link " href="#contact"onClick={event}>Contact</a></li> */}
          {/* <li><a className="getstarted " href="#about"onClick={event}>Get Started</a></li> */}
        </ul>
        <i onClick={event} className={`bi bi-list mobile-nav-toggle  ${showMobileNav && 'bi-x'}`}></i>
      </nav>

    </div>
  </header>
    );
}