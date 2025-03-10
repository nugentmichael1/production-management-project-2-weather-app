import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function registerUser(username, password) {
  const user = { username, password };
  localStorage.setItem('user', JSON.stringify(user));
  console.log('User registered:', user);
}
export default function RegisterComponent() {
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
    registerUser(formData.email, formData.password);
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
      <Typography variant="h4" textAlign="center">Register</Typography>
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