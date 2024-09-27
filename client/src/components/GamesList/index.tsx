import { GameCard } from "../GameCard";
import { Game } from "../types/games";
import styles from "./GamesList.module.css";

interface Props {
  games: Game[];
  columnNum: number;
}

export const GamesList = ({ games, columnNum }: Props) => {
  return (
    <div
      className={styles.container}
      style={{ gridTemplateColumns: `repeat(${columnNum}, 1fr)` }}
    >
      {games?.length ? (
        games.map((game: Game) => {
          return <GameCard key={game.id} name={game.name} cover={game.cover} />;
        })
      ) : (
        <div>No games found</div>
      )}
    </div>
  );
};
