import { useState } from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css"; 

function SearchBar({ onSubmit }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (query.trim() === "") {
            return;
        }
        onSubmit(query);
        setQuery("");
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
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
