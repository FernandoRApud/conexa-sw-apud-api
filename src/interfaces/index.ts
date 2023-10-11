export type IDictionary<TValue> = Record<string, TValue>;

export type IFetchedData = {
  [key: string]: string | string[];
};

export type IAppError = Error & {
  code: number,
  message: string
};

export type IPeople = {
  name: string
  birth_year: string
  eye_color: string
  gender: string
  hair_color: string
  height: string
  mass: string
  skin_color: string
  homeworld: string
  films: []
  species: []
  starships: []
  vehicles: []
  url: string
  created: string
  edited: string
};
