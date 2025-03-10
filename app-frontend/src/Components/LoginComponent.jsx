import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import Main from './Main';

function loginUser(username, password) {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.username === username && storedUser.password === password) {
    localStorage.setItem('isLoggedIn', 'true');
    console.log('User logged in successfully.');
    return true;
  } else {
    console.log('Invalid username or password.');
    return false;
  }
}

export default function LoginComponent() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(formData.email, formData.password);
    console.log('Form Data Submitted:', formData);
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: 'auto',
        marginTop: 4
      }}
    >
      <Typography variant="h4" textAlign="center">Login</Typography>
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};