// Define an API key for The Movie Database (TMDb)
const key = "ef4286155ba69a1548bbbdf7122a986a";

// Create an object called 'requests' that contains URLs for various movie categories

const requests = {
    // Fetch trending movies and TV shows for the week
    fetchTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=${key}&language=en-US`,

    // Fetch Netflix original TV shows
    fetchNetflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_networks=213`,

    // Fetch top-rated movies
    fetchTopRatedMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US`,

    // Fetch action movies
    fetchActionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=28`,

    // Fetch comedy movies
    fetchComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=35`,

    // Fetch horror movies
    fetchHorrorMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27`,

    // Fetch romance movies
    fetchRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=10749`,

    // Fetch documentaries
    fetchDocumentaries: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=99`,
};

// Export the 'requests' object for use in other parts of the application
export default requests;
