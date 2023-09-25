// Import necessary modules and components
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const LogIn = () => {
    // Initialize state variables for email, password, and error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Get the user and login function from the authentication context
    const {  login } = UserAuth();
    
    // Get the navigate function from React Router
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Attempt to log in with the provided email and password
            await login(email, password);
            
            // Redirect to the home page on successful login
            navigate('/');
        } catch (error) {
            console.log(error);
            if (error.code === "auth/invalid-login-credentials") {
                // Display an error message for invalid credentials
                setError("Invalid password or email");
            }
        }
    };

    return (
        <div className='w-full h-screen'>
            {/* Background image */}
            <img
                className='hidden sm:block absolute w-full h-full object-cover'
                src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
                alt='/'
            />
            {/* Overlay */}
            <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
            {/* Login form */}
            <div className='fixed w-full px-4 py-24 z-50'>
                <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                    <div className='max-w-[320px] mx-auto py-16'>
                        <h1 className='text-3xl font-bold'>Sign In</h1>
                        {error ? <p className='p-3 bg-red-400 my-2'>{error}</p> : null}
                        <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                className='p-3 my-2 bg-gray-700 rounded'
                                type='email'
                                placeholder='Email'
                                autoComplete='email'
                            />
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className='p-3 my-2 bg-gray-700 rounded'
                                type='password'
                                placeholder='Password'
                                autoComplete='current-password'
                            />
                            <button className='bg-red-600 py-3 my-6 rounded font-bold'>
                                Sign In
                            </button>
                            <div className='flex justify-between items-center text-sm text-gray-600'>
                                <p>
                                    <input className='mr-2' type='checkbox' />
                                    Remember me
                                </p>
                                <p>Need Help?</p>
                            </div>
                            <p className='py-8'>
                                <span className='text-gray-600 mr-6'>New to Netflix?</span>{' '}
                                <Link to='/signup'>Sign Up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
