export interface Game {
  cover: string;
  coverLarge: string;
  date: string;
  id: number;
  name: string;
  provider: number;
}

export interface Provider {
  id: number;
  name: string;
  logo: string;
}

export interface Group {
  id: number;
  name: string;
  games: number[];
}
