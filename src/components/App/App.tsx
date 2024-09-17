import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../../components/ImageModal/ImageModal';
import { fetchImages } from '../../api';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';
import { Image } from './App.types';

const App = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) => [
          ...prevImages,
          ...data.results.map(image => ({
            ...image,
            urls: {
              small: image.urls.small,
              regular: image.urls.regular || image.urls.small, 
            },
          })),
        ]);
        setShowBtn(data.total_pages > page);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || 'Failed to load images. Please try again later.');
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearchSubmit = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term.');
      return;
    }
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image: Image) => {
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
      {isModalOpen && modalImage && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          image={modalImage}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;