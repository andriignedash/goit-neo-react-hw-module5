import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../services/api";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Fetching cast for movieId:", movieId);
    const fetchCast = async () => {
      try {
        const data = await getMovieCast(movieId);
        console.log("Cast data received:", data);
        if (data.length > 0) {
          setCast(data);
        } else {
          setError("No cast found.");
        }
      } catch (err) {
        console.error("Error fetching cast:", err);
        setError("Failed to fetch cast.");
      }
    };
    if (movieId) fetchCast();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cast</h2>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.castGrid}>
          {cast.length > 0 ? (
            cast.map((actor) => (
              <div key={actor.id} className={styles.card}>
                <img
                  className={styles.photo}
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "/no-image.png"
                  }
                  alt={actor.name}
                />
                <h3 className={styles.name}>{actor.name}</h3>
                <p className={styles.character}>
                  {actor.character ? `Character: ${actor.character}` : "—"}
                </p>
              </div>
            ))
          ) : (
            <p className={styles.noCast}>No cast information available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieCast;
