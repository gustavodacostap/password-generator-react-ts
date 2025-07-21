import styles from "../styles/Toast.module.css";
import { AiOutlineClose } from 'react-icons/ai';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  return (
    <div className={styles.toast}>
      <p>{message}</p>
      <button onClick={onClose} aria-label="Fechar" className={styles.closeButton}>
        <AiOutlineClose />
      </button>
    </div>
  );
}