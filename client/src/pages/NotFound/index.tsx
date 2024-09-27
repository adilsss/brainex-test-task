import styles from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>Page not found</h1>
      <div>
        <a href="/" className={styles.link}>
          Return home
        </a>
      </div>
    </div>
  );
};
