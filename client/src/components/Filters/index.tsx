import React, { useState } from "react";
import { ColumnsChanger } from "../ColumnsChanger";
import { SearchInput } from "../Search";
import { Game, Group, Provider } from "../types/games";
import { FilterComponent } from "./FilterItem";
import styles from "./Filters.module.css";

interface Props {
  searchValue: string;
  isDesktop: boolean;
  data: {
    providers: Provider[];
    groups: Group[];
    games: Game[];
  };
  activeProviders: number[];
  activeGroups: number[];
  selectedSorting: string;
  columnNums: number;
  gameList: Game[];
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleActiveProviders: (id: number) => void;
  handleActiveGroups: (id: number) => void;
  handleSortingChange: (sorting: string) => void;
  handleColumnClick: (step: number) => void;
  handleReset: () => void;
}

export const Filters = ({
  searchValue,
  isDesktop,
  data,
  activeProviders,
  activeGroups,
  selectedSorting,
  columnNums,
  gameList,
  handleInput,
  handleActiveProviders,
  handleActiveGroups,
  handleSortingChange,
  handleColumnClick,
  handleReset,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sortings = ["A-Z", "Z-A", "Newest"];

  return (
    <div className={styles.filters}>
      <div style={{ width: "100%" }}>
        <SearchInput value={searchValue} onChange={handleInput} />
        <div>
          {(isDesktop || isOpen) && (
            <div>
              <FilterComponent
                title="Providers"
                items={data.providers}
                activeItems={activeProviders}
                onClick={handleActiveProviders}
                itemKey="id"
                itemLabel="name"
              />
              <FilterComponent
                title="Groups"
                items={data.groups}
                activeItems={activeGroups}
                onClick={handleActiveGroups}
                itemKey="id"
                itemLabel="name"
              />
              <FilterComponent
                title="Sorting"
                items={sortings.map((sorting) => ({
                  id: sorting,
                  name: sorting,
                }))}
                activeItems={[selectedSorting]}
                onClick={handleSortingChange}
                itemKey="id"
                itemLabel="name"
              />
              <ColumnsChanger
                columnNums={columnNums}
                handleClick={handleColumnClick}
              />
              <div className={styles.botInfo}>
                <span style={{ color: "#808080" }}>
                  Games amount: {gameList.length}
                </span>
                <button className={styles.reset} onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          )}
          {!isDesktop && (
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={styles.showHideBtn}
            >
              <img src="/burger.svg" alt="burger" />
              <span style={{ color: "#3F53BE", marginLeft: "8px" }}>
                {isOpen ? "Hide" : "Show"} Filters
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
