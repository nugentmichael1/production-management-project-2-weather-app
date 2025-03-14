import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import apiClient from '../apiClient';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LoginComponent() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });

  //we use this to navigate to the Home component after successful validation
  const navigate = useNavigate();
  const goToNewComponent = () => {
    navigate("/home");
  }

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   loginUser(formData.email, formData.password);
  //   console.log('Form Data Submitted:', formData);
  // }


  // function loginUser(username, password) {
  //   const storedUser = JSON.parse(localStorage.getItem('user'));
  //   if (storedUser && storedUser.username === username && storedUser.password === password) {
  //     localStorage.setItem('isLoggedIn', 'true');
  //     setIsLoggedIn(true);
  //     console.log('User logged in successfully.')
  //     goToNewComponent();
  //     return true;
  //   } else {
  //     console.log('Invalid username or password.');
  //     return false;
  //   }
  // }

  //-----------Google Login------------------

  const handleSuccess = (credentialResponse) => {
    console.log("Frontend OAuth Login Success:", credentialResponse);

    const idToken = credentialResponse.credential

    //Session implementation
    apiClient
      .post("/auth/google", { idToken })
      .then((response) => {
        console.log("Backend OAuth Login Success:", response.data)
        //using localStorage for validation until sessions are integrated 
        localStorage.setItem("isLoggedIn", true)
        setIsLoggedIn(true);
        goToNewComponent();
      })
      .catch((error) => console.error("Backend OAuth Login Error:", error));
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  //-----------Google Login------------------

  return (
    <>
      <Box
        component="form"
        // onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 400,
          margin: 'auto',
          marginTop: 4
        }}
      >

        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />

        {/* <Typography variant="h6" textAlign="center">Login</Typography>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth>
          Submit
        </Button> */}

      </Box>

    </>
  );
};