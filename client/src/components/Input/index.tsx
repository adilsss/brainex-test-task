import { useRef, useState } from "react";
import styles from "./Input.module.css";
import { PasswordIcon } from "../PasswordIcon";

interface Props {
  label: string;
  showIcon?: boolean | undefined;
  type: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Input = ({ label, onChange, showIcon, type, value }: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOnFocus = () => {
    if (inputRef.current?.value !== "") return;
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    if (inputRef.current?.value !== "") return;
    setIsFocused(false);
  };

  return (
    <div className={styles.input}>
      <div className={styles.wrap}>
        <label className={isFocused ? styles.active : ""}>{label}</label>
        <input
          onChange={onChange}
          type={type === "password" && show ? "text" : type}
          value={value}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          ref={inputRef}
        />
      </div>
      {showIcon && type === "password" && (
        <div
          style={{ marginRight: "16px", marginTop: "8px", cursor: "pointer" }}
        >
          <PasswordIcon onClick={() => setShow(!show)} active={show} />
        </div>
      )}
    </div>
  );
};
