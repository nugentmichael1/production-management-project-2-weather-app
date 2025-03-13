import './App.css';
import RegisterComponent from './Components/RegisterComponent';
import LoginComponent from './Components/LoginComponent';
import { AuthContext } from "./context/AuthContext";
import { Routes, Route } from "react-router";
import Home from './Components/Home';
import { useContext, useEffect } from 'react';



export default function App() {
  const { isLoggedIn } = useContext(AuthContext)
  useEffect(() => {
    if (!isLoggedIn) {
      document.body.style.background = "#fff"; // White background when not logged in
      return;
    }
  }, [isLoggedIn])
  return (<>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<LoginComponent />} />
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/login" element={<LoginComponent />} />
    </Routes>
  </>)
}