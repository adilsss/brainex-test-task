import styles from "./ColumnsChanger.module.css";

interface Props {
  columnNums: number;
  handleClick: (step: number) => void;
}

export const ColumnsChanger = ({ columnNums, handleClick }: Props) => {
  const steps = [2, 3, 4];

  return (
    <div className={styles.columnsChanger}>
      {steps.map((step) => (
        <div
          key={step}
          className={`${styles.stepItem} ${
            columnNums >= step ? styles.active : 0
          }`}
          onClick={() => handleClick(step)}
        >
          {step}
        </div>
      ))}
      <div className={styles.progressLineContainer}>
        <div
          className={styles.progressLine}
          style={{
            width: columnNums === 2 ? "0%" : columnNums === 3 ? "50%" : "100%",
            backgroundColor: columnNums >= 2 ? "#FDBC11" : "#F2F2F2",
          }}
        />
      </div>
    </div>
  );
};
