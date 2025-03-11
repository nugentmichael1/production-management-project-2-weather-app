import { Box, Button, Link, Typography } from "@mui/material"
import LoginComponent from "./LoginComponent";
import NavDrawer from "./Navigation/NavDrawer";
import { useState } from "react";

export default function Home() {

    //use this to refresh component instead of redirecting
    //   const [refresh, setRefresh] = useState(false);
    //   const refreshComponent = () => {
    //     setRefresh(!refresh); // Toggle the state to trigger a re-render
    //   };

    function validateUser() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            console.log('User is logged in.');
            // refreshComponent();
            return true;
        } else {
            console.log('User is NOT logged in.');
            // refreshComponent();
            return false;
        }
    }

    return (<>
        <NavDrawer />
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
            {/* <Typography
                textAlign='center'
                variant='h2'>
                Main Page
            </Typography> */}

        </Box>

        {validateUser() ? null : <LoginComponent />}

    </>
    )
}