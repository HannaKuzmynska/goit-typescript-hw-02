import Modal from 'react-modal';
import { Image } from '../App/App.types';
import styles from './ImageModal.module.css';

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: Image | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, image }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={styles.modalContent} 
      overlayClassName={styles.modalOverlay} 
    >
      <img
        src={image.urls.regular || image.urls.small}
        alt={image.alt_description || 'Image'}
        className={styles.modalImage} 
      />
    </Modal>
  );
};

export default ImageModal;