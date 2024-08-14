import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchImages } from './api';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      setLoading(true);
      setError(null); 

      try {
        const data = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...data.results]);
        setShowBtn(data.total_pages && data.total_pages > page);
      } catch (error) {
        setError(error.message || 'Failed to load images. Please try again later.');

      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearchSubmit = (searchQuery) => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term.');
      return;
    }
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className="appContainer">
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {!error && showBtn && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          image={modalImage}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
