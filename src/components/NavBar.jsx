// Import necessary modules and components
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import "./nav.css";

const NavBar = () => {
    // Get user data and logout function from the authentication context
    const { user, LogOut } = UserAuth();
    const [show, handleShow] = useState(false);

    useEffect(() => {
        // Add a scroll event listener to show/hide the navbar background
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        });
        
        // Remove the scroll event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    // Initialize navigation function
    const Navigate = useNavigate();

    // Function to handle user logout
    const handleLogOut = async () => {
        try {
            // Call the logout function from the authentication context
            await LogOut();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`nav ${show && "bg-black"}`}>
            <Link to='/'>
                <img
                    className='nav__logo'
                    src="https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png" alt="logo" />
            </Link>
            {user?.email ?
                // If user is authenticated log in, show account and logout buttons
                <div>
                    <Link to='/account'>
                        <button className='text-white pr-4 text-2xl'>Account</button>
                    </Link>
                    <button onClick={handleLogOut}
                        className='bg-red-600 text-white py-2 px-6 rounded cursor-pointer '>
                        <a href="/">LogOut</a>
                    </button>
                </div>
                :
                // If user is not authenticated sign out, show sign-in and sign-up buttons
                <div>
                    <Link to='/login'>
                        <button className='text-white pr-4 text-2xl'>Sign In</button>
                    </Link>
                    <Link to='/signup'>
                        <button className='bg-red-600 text-white py-2 px-6 rounded cursor-pointer '>Sign Up</button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default NavBar;
