import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <Oval color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;