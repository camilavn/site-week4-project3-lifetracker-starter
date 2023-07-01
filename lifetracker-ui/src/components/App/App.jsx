import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Portal from '../Portal/portal'



export default function App() {
  const [appState, setAppState] = useState({})

  return (
    <div>
      <div className="App">
      <BrowserRouter>
        <Navbar user={appState.user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<Register setAppState={setAppState} />} />
          <Route path="/auth/login" element={<Login setAppState={setAppState} />} />
          <Route
            path="/auth/portal"
            element={<Portal setAppState={setAppState} appState={appState} user={appState?.user} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  )
}

