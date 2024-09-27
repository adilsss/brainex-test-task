import { ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  children: ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

export const Button = ({ children, loading, onClick }: Props) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {loading ? (
        <img src="/loading.svg" alt="loading" className={styles.loading} />
      ) : (
        children
      )}
    </button>
  );
};
