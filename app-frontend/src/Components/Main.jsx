import NavDrawer from "./Navigation/NavDrawer"
import { Box, Button, Link, Typography } from "@mui/material"

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    console.log('User has been logged out.');
}

export default function Main() {
    return (<>
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 400,
                margin: 'auto',
                marginTop: 4
            }}>
            <Typography
                textAlign='center'
                variant='h2'>
                Main Page
            </Typography>

            <Button
                onClick={logoutUser}
                variant='contained'
                component={Link}
                to='/'>
                Log Out
            </Button>
        </Box>
    </>
    )
}