// Import necessary modules and components
import { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';
import { db } from '../../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';

const SavedShows = () => {
    // Initialize state variables
    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();

    // Function to slide the content left
    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    // Function to slide the content right
    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    // Fetch saved shows data from Firestore
    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows);
        });
    }, [user?.email]);

    // Define the reference to the user's document in Firestore
    const movieRef = doc(db, 'users', `${user?.email}`);

    // Function to delete a saved show
    const deleteShow = async (passedID) => {
        try {
            const result = movies.filter((item) => item.id !== passedID);
            await updateDoc(movieRef, {
                savedShows: result
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
            <div className='relative flex items-center group'>
                {/* Left slide button */}
                <MdChevronLeft
                    onClick={slideLeft}
                    className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />
                {/* Content slider */}
                <div
                    id={'slider'}
                    className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
                >
                    {movies.map((item) => (
                        <div
                            key={item.id}
                            className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'
                        >
                            {/* Show image */}
                            <img
                                className='w-full h-auto block'
                                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                                alt={item?.title}
                            />
                            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                                {/* Show title */}
                                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                                    {item?.title}
                                </p>
                                {/* Close button to delete show */}
                                <p onClick={() => deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose /></p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Right slide button */}
                <MdChevronRight
                    onClick={slideRight}
                    className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />
            </div>
        </>
    );
};

export default SavedShows;
