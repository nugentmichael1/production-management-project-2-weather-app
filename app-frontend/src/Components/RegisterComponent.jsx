import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import LoginComponent from './LoginComponent';

function registerUser(username, password) {
  const user = { username, password };
  localStorage.setItem('user', JSON.stringify(user));
  console.log('User registered:', user);
  goToNewComponent();
}
export default function RegisterComponent() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  //we use this to navigate to the Login component after successful registration
  const navigate = useNavigate();
  const goToNewComponent = () => {
    navigate("/login");
  }
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
    <>
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
        <Typography variant="h6" textAlign="center">Register</Typography>
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
        <Button type="submit" variant="contained" color="primary"
          fullWidth>
          Submit
        </Button>
      </Box>
    </>
  );
};