import { AuthForm } from "../../components/AuthForm";
import styles from "./Auth.module.css";

export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <AuthForm />
    </div>
  );
};
