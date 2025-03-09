import Modal from "react-modal";
import styles from "./ImageModal.module.css";

export default function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.content}>
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className={styles.fullImage}
        />
      </div>
    </Modal>
  );
}
