import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');
  console.log("Submitting form: ", form); 

  try {
    const res = await axios.post('http://localhost:5000/register', form);
    console.log("Server response: ", res.data); 
    setSuccess(true);
    setMessage(res.data.message);
    setForm({ username: '', email: '', password: '' });
  } catch (err) {
    console.error("Error: ", err.response?.data || err.message); 
    setSuccess(false);
    setMessage(err.response?.data?.error || 'Something went wrong');
  }
};


  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="register-input" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="register-input" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="register-input" required />
        <button type="submit" className="register-button">Register</button>
      </form>
      <p style={{ color: success ? 'green' : 'red', marginTop: '10px' }}>{message}</p>
    </div>
  );
};

export default Register;
