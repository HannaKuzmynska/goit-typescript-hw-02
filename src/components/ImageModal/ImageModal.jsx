
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

function ImageModal({ isOpen, onRequestClose, image }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <img src={image.urls.regular} alt={image.alt_description} className={styles.image} />
    </Modal>
  );
}

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    urls: PropTypes.object.isRequired,
    alt_description: PropTypes.string,
  }).isRequired,
};

export default ImageModal;