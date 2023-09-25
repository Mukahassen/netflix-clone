// Import necessary modules and components
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Movies from './Movies';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const Row = ({ title, fetchUrl, rowID, isLarge }) => {
    // Initialize state to hold the list of movies
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    // Fetch movies data when the component mounts or when 'fetchUrl' changes
    useEffect(() => {
        axios.get(fetchUrl).then((response) => {
            setMovies(response.data.results);
        });
    }, [fetchUrl]);

    const opts = {
        height: "300",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    };

    // Function to slide the movie row to the left
    const slideLeft = () => {
        var slider = document.getElementById("slider" + rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    // Function to slide the movie row to the right
    const slideRight = () => {
        var slider = document.getElementById("slider" + rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    // Function to play a video trailer
    const playVideo = (item) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(item?.name || item?.title || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <div>
            <h2 className='text-white font-bold md:text-3xl p-4'>{title}</h2>
            <div className={`relative flex items-center group ${isLarge}`}>
                {/* Left scroll button */}
                <MdChevronLeft
                    onClick={slideLeft}
                    className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />
                    <div id={'slider' + rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                        {/* Render movies */}
                        {movies.map((item, id) => (
                            <Movies key={id} item={item} playVideo={playVideo} />
                        ))}
                    </div>
                {/* Right scroll button */}
                <MdChevronRight
                    onClick={slideRight}
                    className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />
            </div>
            <div>
                
                {/* Render YouTube video if 'trailerUrl' is available */}
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </div>
    );
}

export default Row;
