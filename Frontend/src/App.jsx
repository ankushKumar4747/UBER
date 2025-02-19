import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import UserLogin from "./components/UserLogin"
import UserSignUp from "./components/UserSignUp"
import CaptainLogin from './components/CaptainLogin'
import CaptainSignup from './components/CaptainSignup'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/register" element={<UserSignUp />} />
        <Route path="/users/login" element={<UserLogin />} />
        <Route path="/captain/register" element={<CaptainSignup />} />
        <Route path="/captain/login" element={<CaptainLogin />} />
      </Routes>

    </div>
  )
}

export default App