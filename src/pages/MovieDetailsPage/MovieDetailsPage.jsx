import { useEffect, useState, useRef } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [ setErrorMessage ] = useState("");

  const backLink = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(movieId);
        if (data && data.title) {
          setMovie(data);
        } else {
          setErrorMessage("Movie not found.");
        }
      } catch {
        setErrorMessage("Failed to fetch movie details.");
      }
    };
    fetchMovie();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <button
        className={styles.goBack}
        onClick={() => navigate(backLink.current)}
      >
        ← Go back
      </button>

      <h1 className={styles.title}>
        {movie?.title} ({movie?.release_date?.slice(0, 4)})
      </h1>

      <div className={styles.movieContent}>
        <img
          className={styles.poster}
          src={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
              : "https://via.placeholder.com/400x600?text=No+Image"
          }
          alt={movie?.title || "Movie Poster"}
        />
        <p className={styles.overview}>{movie?.overview}</p>
      </div>

      <div className={styles.additionalInfo}>
        <h2 className={styles.sectionTitle}>Additional Information</h2>
        <nav className={styles.navLinks}>
          <NavLink
            to="cast"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            state={{ from: backLink.current }}
          >
            Cast
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            state={{ from: backLink.current }}
          >
            Reviews
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
