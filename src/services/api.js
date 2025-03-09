import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGZjNGFhOTQ3YjQwMDhlZmZhMmE1MWI4YmQ0ODhiYiIsIm5iZiI6MTc0MTUzOTM0My45NjYsInN1YiI6IjY3Y2RjODBmYWQ0ODZiNDNlYmUyZGEzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.onI8Aiuqbd4_gf8FtU6jGp5Uydba041bc2RHLD_ABkQ";
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
};

const fetchData = async (url) => {
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    return null;
  }
};

export const fetchTrendingMovies = async () => {
  const data = await fetchData(`${BASE_URL}/trending/movie/day`);
  return data?.results || [];
};

export const searchMovies = async (query) => {
  const data = await fetchData(`${BASE_URL}/search/movie?query=${query}`);
  return data?.results || [];
};

export const getMovieDetails = async (movieId) => {
  const data = await fetchData(`${BASE_URL}/movie/${movieId}`);
  return data || {};
};

export const getMovieCast = async (movieId) => {
  const data = await fetchData(`${BASE_URL}/movie/${movieId}/credits`);
  return data?.cast || [];
};

export const getMovieReviews = async (movieId) => {
  const data = await fetchData(`${BASE_URL}/movie/${movieId}/reviews`);
  return data?.results || [];
};
