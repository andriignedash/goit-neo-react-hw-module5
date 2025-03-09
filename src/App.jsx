import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { fetchImages } from "./services/api.js";
import styles from "./App.module.css";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchImages(query, page);
        setImages((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (error) {
        setError("Something went wrong. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setImages([]);
      setPage(1);
    }
  };

  const loadMore = () => setPage((prev) => prev + 1);
  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className={styles.app}>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {page < totalPages && images.length > 0 && (
        <LoadMoreBtn onClick={loadMore} />
      )}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
}
