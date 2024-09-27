import React from "react";
import styles from "./SearchInput.module.css";

interface Props {
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ value, onChange }: Props) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
        className={styles.inputField}
      />
      <img className={styles.searchIcon} src="/search.svg" alt="search" />
    </div>
  );
};
