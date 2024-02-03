import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInForm = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // SignIn user based on email and password
    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            console.log('Sending request with:', email, password);

            const response = await axios.get('http://localhost:5000/users', {
                params: {
                    email,
                    password,
                },
            });

            console.log('Server response:', response);

            if (response) {
                props.setSuccess(true);   //states get updated on successful login
                navigate('/main');
            } else {
                setError('Wrong credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);

            // Update the error message based on different scenarios
            if (error.response) {
                setError('Invalid email or password. Please try again.');
            } else if (error.request) {
                setError('No response from the server. Please try again later.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSignIn} className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-600 mb-1">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-600 mb-1">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignInForm;
