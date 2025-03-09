import { useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => setInput(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter a search term!");
      return;
    }
    onSubmit(input);
    setInput("");
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="submit" className={styles.searchButton}>
          <FaSearch />
        </button>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search images..."
          className={styles.input}
        />
      </form>
    </header>
  );
}