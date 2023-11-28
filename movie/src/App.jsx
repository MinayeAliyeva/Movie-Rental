import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import YouTube from "react-youtube";
import "./App.css";
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280/";
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

    return movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} selectedMovie={selectMovie} />
    ));
  }

  //video ucun
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: "5de87e1bc5e9a0ac27e1f4758765722a",
        append_to_response: "videos",
      },
    });
    // console.log(results.results);
    return data;
  };
  const selectMovie = async (movie) => {
    const data = await fetchMovie(movie.id);
    // console.log('movie data',data);
    setSelectedMovie(data);
  };
  //
  const serachMoviesFunc = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };
  const renderTrailer = () => {
    const trailler = selectMovie.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    console.log(trailler);
    return <YouTube videoId={trailler.key} />;
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
      <div
        className="hero "
        style={{
          backgroundImage: `url(${IMAGE_PATH}${selectedMovie.backdrop_path})`,
        }}
      >
        {/* {console.log("sel", selectedMovie)} */}
        {selectMovie.videos ? renderTrailer() : null}
        <div className="hero-content max-center">
          {/* {console.log(selectedMovie)} */}
          <button className={"button"}>Play Trailler</button>
          <h1 className={"herro-title"}>
            {selectedMovie.title}
            {selectedMovie.overview ? (
              <p className="overview">{selectedMovie.overview}</p>
            ) : null}
          </h1>
        </div>
      </div>

      <div className="container">{renderedMovies()}</div>
    </div>
  );
};

export default App;
