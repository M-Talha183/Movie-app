// import { Search } from "./components/Search.jsx";
// import { useState, useEffect } from "react";
// import { useDebounce } from "react-use";
// import Spinner from "./components/Spinner.jsx";
// import MovieCard from "./components/MovieCard.jsx";
// import { getTrendingMovies, updateSearchCount } from './appwrite.js'





// const API_BASE_URL = "https://api.themoviedb.org/3";
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// const API_OPTIONS = {
//   method : "GET",
//   headers : {
//     accept : "application/json",
//     Authorization: `Bearer ${API_KEY}`
//   }
// }

// function App () {
//   const [searchTrem , setSearchTrem] = useState("");
//   const [errorMessage , setErrorMessage] = useState("")
//   const [moviesList, setMoviesList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
//   const [trendingMovies, setTrendingMovies] = useState([]);


//   useDebounce(() => setDebounceSearchTerm(searchTrem), 500,  [searchTrem]);

//   const fethch_movies = async (query = "") =>{
//     try {
//       setLoading(true);
//       setErrorMessage("");
//       const endpoint = query
//         ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
//         : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
//       const responce = await fetch(endpoint, API_OPTIONS)
      
//       if (!responce.ok){
//         throw new Error("Failed to fetch movies");
//       }
//       const data = await responce.json();

//       if (data.responce === "False") {
//         setErrorMessage(data.Error || "Failed to fatch movies ")
//         setMoviesList([])
//         return
//       }
//       setMoviesList(data.results || [])

//       if(query && data.results.length > 0) {
//         await updateSearchCount(query, data.results[0]);
//       }


//     }
//     catch (error){
//       console.error("Error fetching movies:", error);
//       setErrorMessage("Failed to fetch movies. Please try again later.");

//     }
//     finally {
//       setLoading(false);
//     }
//   }

// const loadTrendingMovies = async () => {
//     try {
//       const movies = await getTrendingMovies();

//       setTrendingMovies(movies);
//     } catch (error) {
//       console.error(`Error fetching trending movies: ${error}`);
//     }
//   }
// useEffect(() => {
//     loadTrendingMovies(debounceSearchTerm);
//   }, []);


//   useEffect(()=>{
//     fethch_movies(debounceSearchTerm);

//   },[debounceSearchTerm])

//   return (
//     <main>
//         <div className="pattern"/>

//         <div className="wrapper">
//           <header>
//             <img src="/hero.png" alt="" />
//             <h1>Find <span className="text-gradient">Movies</span>You have Enjoy without the Hassle</h1>
//              <Search searchTrem={searchTrem} setSearchTrem={setSearchTrem}/>
//           </header>

//                   {trendingMovies.length > 0 && (
//           <section className="trending">
//             <h2>Trending Movies</h2>

//             <ul>
//               {trendingMovies.map((movie, index) => (
//                 <li key={movie.$id}>
//                   <p>{index + 1}</p>
//                   <img src={movie.poster_url} alt={movie.title} />
//                 </li>
//               ))}
//             </ul>
//           </section>
//         )}


//             <section className="all-movies">
//               <h2>All Movies</h2>
//               {loading ? (
//                 <Spinner/> 
//               ) : errorMessage ? (
//                 <p className="text-red-500">{errorMessage}</p>
//               ): (
//                 <ul>
//                   {
//                     moviesList.map(movie => (
//                 <MovieCard key={movie.id} movie={movie} />
//                     ))
//                   }
//                 </ul>
//               )}
//               </section>   
//         </div>

//     </main>
//   )
// }

// export default App


import { Search } from "./components/Search.jsx";
import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTrem, setSearchTrem] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebounceSearchTerm(searchTrem), 500, [searchTrem]);

  const fethch_movies = async (query = "") => {
    try {
      setLoading(true);
      setErrorMessage("");
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const responce = await fetch(endpoint, API_OPTIONS);

      if (!responce.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await responce.json();

      if (data.responce === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMoviesList([]);
        return;
      }

      setMoviesList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]); // query = search term
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    fethch_movies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="" />
          <h1>
            Find <span className="text-gradient">Movies</span> You have Enjoy
            without the Hassle
          </h1>
          <Search searchTrem={searchTrem} setSearchTrem={setSearchTrem} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {moviesList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
