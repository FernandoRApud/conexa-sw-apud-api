export type IDictionary<TValue> = Record<string, TValue>;

export type IFetchedData = {
  [key: string]: string | string[];
};

export type IFetchedDataExtended = IFetchedData & {
  homeworld: string;
  films: string[] | string;
  species: string[] | string;
  vehicles: string[] | string;
  starships: string[] | string;
};

export type IAppError = Error & {
  code: number,
  message: string
};
