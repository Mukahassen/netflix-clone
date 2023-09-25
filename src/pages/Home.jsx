// Import necessary modules and components
import Main from '../components/Main';
import Row from '../components/Row';
import requests from '../requests';

const Home = () => {
    return (
        <div>
            
            {/* Render the Main component */}
            <Main />
            
            {/* Render rows of different movie categories */}
            <Row title="Trending Now" rowID="1" fetchUrl={requests.fetchTrending} isLarge = {true} />
            <Row title="Top Rated" rowID="2" fetchUrl={requests.fetchTopRatedMovies} />
            <Row title="Action Movies" rowID="3" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" rowID="4" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror Movies" rowID="5" fetchUrl={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" rowID="6" fetchUrl={requests.fetchRomanceMovies} />
            <Row
                title="Documentaries Movies" rowID="7"
                fetchUrl={requests.fetchDocumentaries}
            />
        </div>
    );
}

export default Home;
