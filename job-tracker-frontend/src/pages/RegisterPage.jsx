// src/pages/RegisterPage.jsx
import React from 'react';
import Register from '../components/Register';

const RegisterPage = ({ onAuth }) => {
  return (
    <div>
      <h1>Register</h1>
      <Register onAuth={onAuth} />
    </div>
  );
};

export default RegisterPage;
