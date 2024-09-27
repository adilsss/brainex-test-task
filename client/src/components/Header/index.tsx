import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a href="https://www.finnplay.com/" target="_blank" rel="noreferrer">
          <img src="/logo.png" alt="logo" className={styles.logo} />
        </a>
        <nav className={styles.nav}>
          <ul>
            <li>
              <button onClick={logout}>
                <img src="/user.svg" alt="logout" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
