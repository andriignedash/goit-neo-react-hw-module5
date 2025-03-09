import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    try {
      setError("");
      const data = await searchMovies(query);

      if (!data || data.length === 0) {
        setError(`No movies found for "${query}". Try another search.`);
        setMovies([]);
        return;
      }

      setMovies(data);
      setSearchParams({ query });
    } catch {
      setError("Failed to fetch movies. Please check your connection.");
      setMovies([]);
    }
  };

  return (
    <div>
      <form className={styles.searchContainer} onSubmit={handleSearch}>
        <input
          className={styles.searchInput}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError("");
          }}
          placeholder="Search for a movie..."
        />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} from="/movies" />}
    </div>
  );
};

export default MoviesPage;
