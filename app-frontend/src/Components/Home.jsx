import { Box } from "@mui/material"
import LoginComponent from "./LoginComponent";
import NavDrawer from "./Navigation/NavDrawer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {

    //we use this to handle component redirects after validation
    //useEffect ensures the component doesn't refresh inifinitely
    const GoToHome = () => {
        const navigate = useNavigate();
        useEffect(() => {
            navigate('/home')
        }, [])
    }
    const GoToLogin = () => {
        const navigate = useNavigate();
        useEffect(() => {
            navigate('/login')
        }, [])
    }

    const validateUser = () => {

        if (localStorage.getItem("isLoggedIn")) {
            console.log("The user IS logged in")
            return true
        }
        else {
            console.log("The user IS NOT logged in")
            return false
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
        </Box>
        { validateUser() ? GoToHome() : GoToLogin() }

    </>
    )
}