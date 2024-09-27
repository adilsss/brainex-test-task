import styles from "./Card.module.css";

interface Props {
  cover: string;
  name: string;
}

export const GameCard = ({ cover, name }: Props) => {
  return (
    <div className={styles.card}>
      <img src={cover} alt={name} title={name} />
    </div>
  );
};
