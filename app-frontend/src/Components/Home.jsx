import { Box, Typography } from "@mui/material"
import LoginComponent from "./LoginComponent";
import WeatherDashboard from "./WeatherDashboard";




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

export default function Home() {


    return (
        <>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: 400,
                    margin: 'auto',
                    marginTop: 4
                }}
            >
                <Typography textAlign='center' variant='h2'>
                    Main Page
                </Typography>
            </Box>

            {validateUser() ? <WeatherDashboard/> : <LoginComponent />}
        </>
    );
}