import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  let navigator = useNavigate();
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');
  const [cpassword, setCPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === cpassword) {
      try {
        const response = await axios.post('http://localhost:3001/signup', {
          name,
          email,
          password,
        });
        window.alert(response.data);
        navigator('/login');
      } catch (e) {
        window.alert(e.message);
      }
    } else {
      window.alert("Password and Confirm password doesn't match");
    }
  };

  return (
    <div className="register-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirm_password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
