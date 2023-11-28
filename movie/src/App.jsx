import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
const API_URL = "https://api.themoviedb.org/3";
const App = () => {
  const [movies, setMuvies] = useState([]);

  const fetchMovies = async () => {
    const { data: results } = await axios.get(`${API_URL}/discover/movie`, {
      params: {
        api_key: "5de87e1bc5e9a0ac27e1f4758765722a",
      },
    });
    setMuvies(results.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  console.log(movies);
function renderedMovies() {
  if (!Array.isArray(movies)) {
    return null;
  }

  return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
}

  return (
    <div className="App">
      <h1>Hello Youtube</h1>
      <div className="container">{renderedMovies()}</div>
    </div>
  );
};

export default App;
