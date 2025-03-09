import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          setError("Failed to load trending movies.");
        }
      } catch {
        setError("Something went wrong while fetching movies.");
      }
    };
    loadMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Today</h1>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <MovieList movies={movies} from="/" />
      )}
    </div>
  );
};

export default HomePage;
