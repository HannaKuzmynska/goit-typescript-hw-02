import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

function ImageGallery({ images, onImageClick }) {
  return (
    <div className={styles.gallery}>
      {images.map((image) => (
        <div key={image.id} className={styles.imageCard} onClick={() => onImageClick(image)}>
          <img
            src={image.urls.small}
            alt={image.alt_description}
            className={styles.image}
          />
          <div className={styles.imageInfo}>
            <p className={styles.author}>Author: {image.user.name}</p>
            <p className={styles.likes}>Likes: {image.likes}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
