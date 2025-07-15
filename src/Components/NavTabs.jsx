import * as React from 'react';
import { NavLink } from 'react-router-dom';


export default function DisabledTabs() {

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
    </li>
  </ul>
 </nav>
 </>
  );
}
