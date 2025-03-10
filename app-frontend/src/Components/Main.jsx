import NavDrawer from "./Navigation/NavDrawer"
import { Button, Link, Typography } from "@mui/material"

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    console.log('User has been logged out.');
}

export default function Main() {
    <>
        <NavDrawer />
        <Typography variant='h2'>Main Page</Typography>
        <Button
            onClick={logoutUser()}
            variant='contained'
            component={Link}
            to='/'>
            Log Out
        </Button>
    </>
}