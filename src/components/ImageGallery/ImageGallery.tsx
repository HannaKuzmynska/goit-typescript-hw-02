import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';
import { Image } from '../App/App.types'; 

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id} className={styles.galleryItem}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
          <div className={styles.imageInfo}>
            <p>Автор: {image.user.name}</p>
            <div className={styles.likes}>
              <i className="fa fa-heart"></i> {image.likes}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;