import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim() === '') {
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <div className={styles.searchBar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Пошук зображень..."
        />
        <button type="submit" className={styles.button}>
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;