import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import "./App.css";
const API_URL = "https://api.themoviedb.org/3";
const App = () => {
  const [movies, setMuvies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const { data: results } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: "5de87e1bc5e9a0ac27e1f4758765722a",
        query: searchKey,
      },
    });
    setSelectedMovie(results.results[0]);

    setMuvies(results.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  function renderedMovies() {
    if (!Array.isArray(movies)) {
      return null;
    }

    return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
  }

  //
  const serachMoviesFunc = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };
  return (
    <div className="App">
      <header className={"header"}>
        <div className="header-content">
          <span>Movie trailler app</span>
          <form onSubmit={(e) => serachMoviesFunc(e)}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type="submit">Search!!</button>
          </form>
        </div>
      </header>
      <div className="hero max-center">
        <div className="hero-content">

        </div>
        <h1>
          {selectedMovie.title}
        </h1>
      </div>

      <div className="container">{renderedMovies()}</div>
    </div>
  );
};

export default App;
