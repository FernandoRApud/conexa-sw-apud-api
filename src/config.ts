const DB_MONGO = process.env.DB_MONGO ?? '';
const PORT = process.env.PORT ?? 4000;
const ROUTES = {
  PLANETS: 'planets/',
  STARSHIPS: 'starships/',
  CHARACTERS: 'people/',
  MOVIES: 'films/',
  VEHICLES: 'vehicles/',
  SPECIES: 'species/',
};

export {
  DB_MONGO,
  PORT,
  ROUTES,
};
