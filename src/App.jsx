import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Page/Home'
import About from './Page/About'
import Cart from './Page/Cart'
import { Route,Routes } from 'react-router-dom'
import NavTabs from './Components/NavTabs'
function App() {


  return (
    <>
   <NavTabs/>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/cart" element={<Cart/>}/>
    </Routes>
    </>
  )
}

export default App
