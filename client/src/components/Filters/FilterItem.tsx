import styles from "./Filters.module.css";

interface Props<T, K extends string | number> {
  title: string;
  items: T[];
  activeItems: K[];
  onClick: (id: K) => void;
  itemKey: keyof T;
  itemLabel: keyof T;
}
export const FilterComponent = <
  T extends { [key: string]: any },
  K extends string | number
>({
  title,
  items,
  activeItems,
  onClick,
  itemKey,
  itemLabel,
}: Props<T, K>) => (
  <div className={styles.filterWrap}>
    <div className={styles.filter}>
      <span style={{ color: "#808080" }}>{title}</span>
      <div className={styles.filterContainer}>
        {items.map((item) => (
          <div
            key={item[itemKey]}
            className={styles.filterItem}
            style={{
              background: activeItems.includes(item[itemKey])
                ? "#FDBC11"
                : "white",
            }}
            onClick={() => onClick(item[itemKey])}
          >
            {item[itemLabel]}
          </div>
        ))}
      </div>
    </div>
  </div>
);
