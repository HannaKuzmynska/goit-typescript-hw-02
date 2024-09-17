import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;