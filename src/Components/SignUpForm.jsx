import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const registerUser = async (userData) => {
    try {
      await axios.post('http://localhost:5000/users', userData);
      console.log('User registered successfully:', userData);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        email,
        password,
        username,
      });
      navigate("/login");
      setEmail('');
      setPassword('');
      setUsername('');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="container bg-white mx-auto  pt-2 pb-2 px-4 mt-20">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border p-2 w-full"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border p-2 w-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border p-2 w-full"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
