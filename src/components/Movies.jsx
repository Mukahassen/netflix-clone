// Import necessary modules and components
import { useState } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from '../../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { AiFillPlayCircle } from 'react-icons/ai';

const Movies = ({ item, isLarge, playVideo }) => {
    // Initialize state variables for like and save
    const [like, setLike] = useState(false);
    const [save, setSave] = useState(false);

    // Get the user from the authentication context
    const { user } = UserAuth();

    // Define the document reference for the user
    const movieId = doc(db, 'users', `${user?.email}`);

    // Function to save a show
    const saveShow = async () => {
        if (user?.email) {
            // Toggle the like state and set save to true
            setLike(!like);
            setSave(true);

            // Update the document with the saved show
            await updateDoc(movieId, {
                savedShows: arrayUnion({
                    id: item.id,
                    title: item.title,
                    img: item.backdrop_path,
                })
            });
        } else {
            // Alert the user to log in if they are not authenticated
            alert('Please log in to save the movie.');
        }
    }

    return (
        <div className='w-[160px] sm:w-[250px] md:w-[300px] lg:w-[280px] inline-block relative p-2 cursor-pointer'>
            <img className='w-full block h-auto'
                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
                <p onClick={saveShow}>
                    {/* Display a heart icon for liking or an empty heart icon */}
                    {like ? <FaHeart className='absolute top-4 left-3 text-gray-300' /> : <FaRegHeart className='absolute top-4 left-3 text-gray-300' />}
                </p>
                <AiFillPlayCircle
                    onClick={() => playVideo(item)} // Call the 'playVideo' function from props
                    size={50}
                    className="absolute top-[90px] right-[125px] mr-2"
                />
            </div>
        </div>
    )
}

export default Movies;
