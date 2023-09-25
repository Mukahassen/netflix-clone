// Import necessary modules and components
import { useEffect, useState } from 'react';
import requests from '../requests';
import axios from 'axios';

const Main = () => {
    // Initialize the 'movies' state variable with an empty array
    const [movies, setMovies] = useState([]);

    // Select a random movie from the 'movies' array
    const movie = movies[Math.floor(Math.random() * movies.length)];

    // Fetch action movies data when the component mounts
    useEffect(() => {
        axios.get(requests.fetchActionMovies).then((res) => {
            setMovies(res.data.results);
        });
    }, []);

    // Function to truncate a string if it's too long
    const truncateString = (str, num) => {
        if (str?.length > num) {
            return (
                str.slice(0, num) + '...'
            );
        } else {
            return str;
        }
    }

    return (
        <div className='w-full h-[600px] text-white'>
            <div className='w-full h-full'>
                {/* Overlay background */}
                <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'></div>
                {/* Movie backdrop image */}
                <img
                    className='w-full h-full object-cover'
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />

                <div className='absolute w-full top-[20%] p-4 md:p-8'>
                    <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
                    <div className='my-4'>
                        <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>
                            Play
                        </button>
                        <button className='border text-white border-gray-300 py-2 px-5 ml-4'>
                            Watch Later
                        </button>
                    </div>
                    <p className='text-gray-400 text-sm'> Released: {movie?.release_date} </p>
                    <p className='w-full md:max-w-[70%] lg:max-w-[76%] text-gray-200 lg:text-4xl lg:font-sans md:text-[20px] lg:mt-[25px] sm:mt-[30px]'>
                        {/* Truncate movie overview */}
                        {truncateString(movie?.overview, 200)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
