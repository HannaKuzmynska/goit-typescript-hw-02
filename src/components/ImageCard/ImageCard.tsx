import styles from './ImageCard.module.css';
import { Image } from '../App/App.types';

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div className={styles.imageCard}>
      <img
        src={image.urls.small}
        alt={image.alt_description || 'Image'}
        className={styles.image}
        onClick={onClick}
      />
    </div>
  );
};

export default ImageCard;