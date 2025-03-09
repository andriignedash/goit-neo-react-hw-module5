import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/api";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log("Fetching reviews for movieId:", movieId);
        const data = await getMovieReviews(movieId);
        console.log("Received data:", data);

        if (data && Array.isArray(data) && data.length > 0) {
          setReviews(data);
        } else {
          setError("No reviews available.");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to fetch reviews.");
      }
    };

    if (movieId) {
      fetchReviews();
    } else {
      setError("Invalid movie ID.");
    }
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews</h2>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.reviewGrid}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <h3 className={styles.author}>Author: {review.author}</h3>
                <p className={styles.content}>{review.content}</p>
              </div>
            ))
          ) : (
            <p className={styles.noReviews}>No reviews available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieReviews;
