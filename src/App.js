import "./App.css";
import { useState } from "react";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w200";

function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovie = () => {
    if (movieTitle.trim() === "") {
      alert("영화 제목을 입력해주세요.");
      return;
    }
    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key={my_api_key}&language=ko&query=${encodeURIComponent(
        movieTitle
      )}&page=1&region=KR`
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchedMovies(data.results.slice(0, 4));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  };
  const showMovieDetails = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="App">
      <div className="Title">
        <h1>Like a Movie People!!!</h1>
      </div>
      <div className="Googling">
        <input
          type="text"
          placeholder="search go!"
          value={movieTitle}
          onChange={(event) => {
            setMovieTitle(event.target.value);
          }}
        />
        <button onClick={searchMovie}>Search Movie</button>
        {loading && <p>Loading...</p>}
      </div>
      <div className="Content">
        <div className="Movies">
          {searchedMovies.map((movie, index) => (
            <div
              className="movie"
              key={index}
              onClick={() => showMovieDetails(movie)}
            >
              <img
                src={
                  movie.poster_path
                    ? `${BASE_IMAGE_URL}${movie.poster_path}`
                    : "placeholder_image_url"
                }
                alt={movie.title}
              />
              <p>
                {movie.title} ({movie.release_date?.split("-")[0]})
              </p>
            </div>
          ))}
        </div>
        {selectedMovie && (
          <div className="MovieDetails">
            <h2>{selectedMovie.title}</h2>
            <p>개봉일: {selectedMovie.release_date}</p>
            <p>줄거리: {selectedMovie.overview}</p>
            <button onClick={() => setSelectedMovie(null)}>닫기</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
