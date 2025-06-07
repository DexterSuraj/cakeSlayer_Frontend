import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigation from './Components/Navigation';

function App() {
  const n=0;
 const [count, setCount]=useState(n);
const handleClick=()=>{
  setCount(p=>p+1);
  setCount(p=>p+1);
}
  return (
    <>
    <Navigation/>
      {count}
      <button onClick={()=>{
        handleClick()
        }}>click</button>

    </>
  )
}

export default App
