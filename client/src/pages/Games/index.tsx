import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { GamesList } from "../../components/GamesList";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Game, Group, Provider } from "../../components/types/games";
import { Filters } from "../../components/Filters";
import styles from "./Games.module.css";

export const GamesPage = () => {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [data, setData] = useState<{
    providers: Provider[];
    groups: Group[];
    games: Game[];
  }>();
  const [filteredGameList, setfilteredGameList] = useState<Game[]>(gameList);
  const [searchValue, setSearchValue] = useState<string>("");
  const [activeProviders, setActiveProviders] = useState<number[]>([]);
  const [activeGroups, setActiveGroups] = useState<number[]>([]);
  const [selectedSorting, setSelectedSorting] = useState<string>("");
  const [columnNums, setColumnsNums] = useState<number>(4);

  const isDesktop = useMediaQuery("(min-width: 960px)");

  useEffect(() => {
    setColumnsNums(isDesktop ? 4 : 2);
  }, [isDesktop]);

  const getGameList = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/data`);
    const data = await response.json();
    if (data) {
      setGameList(data.games);
      setData(data);
      setfilteredGameList(data.games);
    }
  };

  useEffect(() => {
    getGameList();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    if (value === "") {
      setGameList(filteredGameList);
    } else {
      const filteredGames = filteredGameList.filter((game) =>
        game.name.toLowerCase().includes(value)
      );
      setGameList(filteredGames);
    }
  };

  const handleActiveProviders = (id: number) => {
    if (activeProviders.includes(id)) {
      setActiveProviders(activeProviders.filter((provider) => provider !== id));
    } else {
      setActiveProviders([...activeProviders, id]);
    }
  };

  const handleActiveGroups = (id: number) => {
    if (activeGroups.includes(id)) {
      setActiveGroups(activeGroups.filter((group) => group !== id));
    } else {
      setActiveGroups([...activeGroups, id]);
    }
  };

  const manageSortings = useCallback(
    (sortedGames: Game[]) => {
      let sorted = [...sortedGames];
      if (selectedSorting === "A-Z") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else if (selectedSorting === "Z-A") {
        sorted.sort((a, b) => b.name.localeCompare(a.name));
      } else if (selectedSorting === "Newest") {
        sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      }
      return sorted;
    },
    [selectedSorting]
  );

  const manageProviders = useCallback(
    (filteredGames: Game[]) => {
      if (activeProviders.length > 0) {
        return filteredGames.filter((game) =>
          activeProviders.includes(game.provider)
        );
      }
      return filteredGames;
    },
    [activeProviders]
  );

  const manageGroups = useCallback(
    (filteredGames: Game[]) => {
      if (activeGroups.length > 0) {
        const activeGroupGames = activeGroups.flatMap((groupId) => {
          const group = data?.groups.find((g: Group) => g.id === groupId);
          return group ? group.games : [];
        });
        return filteredGames.filter((game) =>
          activeGroupGames.includes(game.id)
        );
      }
      return filteredGames;
    },
    [activeGroups, data]
  );

  useEffect(() => {
    setSearchValue("");
    let filteredGames = filteredGameList;
    filteredGames = manageProviders(filteredGames);
    filteredGames = manageGroups(filteredGames);

    let sortedGames = manageSortings(filteredGames);
    setGameList(sortedGames);
  }, [
    activeProviders,
    activeGroups,
    filteredGameList,
    selectedSorting,
    manageProviders,
    manageGroups,
    manageSortings,
  ]);

  const handleSortingChange = (sorting: string) => {
    setSelectedSorting(sorting);
  };

  const handleReset = () => {
    setActiveProviders([]);
    setActiveGroups([]);
    setSelectedSorting("");
    setGameList(filteredGameList);
    isDesktop ? setColumnsNums(4) : setColumnsNums(2);
  };

  const handleColumnClick = (step: number) => {
    setColumnsNums(step);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        {gameList && <GamesList columnNum={columnNums} games={gameList} />}
        {data && (
          <Filters
            searchValue={searchValue}
            isDesktop={isDesktop}
            data={data}
            activeProviders={activeProviders}
            activeGroups={activeGroups}
            selectedSorting={selectedSorting}
            columnNums={columnNums}
            gameList={gameList}
            handleInput={handleInput}
            handleActiveProviders={handleActiveProviders}
            handleActiveGroups={handleActiveGroups}
            handleSortingChange={handleSortingChange}
            handleColumnClick={handleColumnClick}
            handleReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};
