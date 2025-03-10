import './App.css';
import RegisterComponent from './Components/RegisterComponent';
import Home from './Components/Home';
import NavDrawer from './Components/Navigation/NavDrawer';
import LoginComponent from './Components/LoginComponent';
import Main from './Components/Main';

function validateUser() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    console.log('User is logged in.');
    return true;
  } else {
    console.log('User is NOT logged in.');
    return false;
  }
}

export default function App() {
  return (<>
    <NavDrawer />
    {validateUser() ? <Main /> : <LoginComponent />}
  </>)
}