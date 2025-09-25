export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  genre: string;
  rating: number;
  platform: string[];
  releaseDate: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CartItem {
  game: Game;
  quantity: number;
}

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  GameDetail: { game: Game };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Catalog: undefined;
  Cart: undefined;
  Profile: undefined;
};