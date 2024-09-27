import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Input";
import styles from "./AuthForm.module.css";
import { Button } from "../Button";

export const AuthForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/games");
    }
  }, [navigate]);

  const handleAuth = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        setLoading(false);
        navigate("/games");
      } else {
        setLoading(false);
        setError("Login failed");
      }
    } catch (error) {
      setLoading(false);
      setError("Error during login");
    }
  };

  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="logo" className={styles.logo} />
      <div className={styles.form}>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Login"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          showIcon={true}
        />
        <div style={{ marginTop: "20px" }}>
          <Button onClick={handleAuth} loading={loading}>
            Login
          </Button>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};
