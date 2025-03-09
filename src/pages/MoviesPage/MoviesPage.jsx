import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const [query, setQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!queryParam) return;
    const fetchMovies = async () => {
      try {
        setError("");
        const data = await searchMovies(queryParam);
        if (!data || data.length === 0) {
          setError(`No movies found for "${queryParam}". Try another search.`);
          setMovies([]);
          return;
        }
        setMovies(data);
      } catch {
        setError("Failed to fetch movies. Please check your connection.");
        setMovies([]);
      }
    };
    fetchMovies();
  }, [queryParam]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a movie name.");
      return;
    }
    setSearchParams({ query });
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
