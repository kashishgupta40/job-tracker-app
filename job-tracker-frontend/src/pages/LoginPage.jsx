// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPage = ({ setUser }) => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const endpoint = isLogin ? '/login' : '/register';
      const { data } = await axios.post(`http://localhost:5000/api/auth${endpoint}`, form);

      localStorage.setItem('token', data.token);
      setUser(data.user);
      toast.success(`Welcome ${data.user.name}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Auth failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {!isLogin && <input name="name" placeholder="Name" onChange={handleChange} />}
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button onClick={handleSubmit}>{isLogin ? 'Login' : 'Register'}</button>
      <br />
      <small onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: 'blue' }}>
        {isLogin ? 'New user? Register here' : 'Already registered? Login'}
      </small>
    </div>
  );
};

export default LoginPage;
