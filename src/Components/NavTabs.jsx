import React from 'react'
import { NavLink } from 'react-router-dom'
const NavTabs = () => {
  return (
    <>
     <nav>
  <ul>
    <li>
    <NavLink to={"/"}>
      Home
    </NavLink>
     <NavLink to={"/about"}>
      About
    </NavLink> 
    <NavLink to={"/cart"}>
      Cart
    </NavLink>
    <NavLink to={"/register"}>
      Register
    </NavLink>
    <NavLink to={"/login"}>
      Login
    </NavLink>
    </li>
  </ul>
 </nav>
    </>
  )
}

export default NavTabs