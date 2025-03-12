import './App.css';
import RegisterComponent from './Components/RegisterComponent';
import LoginComponent from './Components/LoginComponent';

import { Routes, Route } from "react-router";
import Home from './Components/Home';

export default function App() {
  return (<>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<LoginComponent />} />
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/login" element={<LoginComponent />} />
    </Routes>
  </>)
}