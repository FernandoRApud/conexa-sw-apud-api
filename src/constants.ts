const DB_MONGO = process.env.DB_MONGO ?? '';
const PORT = process.env.PORT ?? 4000;
const ROUTES = {
  PLANETS: 'planets/',
  STARSHIPS: 'starships/',
  PEOPLE: 'people/',
  FILMS: 'films/',
  VEHICLES: 'vehicles/',
  SPECIES: 'species/',
};
const HOMEWORLD_INDEX = 'homeworld';
const FILMS_INDEX = 'films';
const SPECIES_INDEX = 'species';
const VEHICLES_INDEX = 'vehicles';
const STARSHIPS_INDEX = 'starships';
const PLANETS_INDEX = 'planets';
const CHARACTERS_INDEX = 'characters';
const RESIDENTS_INDEX = 'residents';
const CACHE_DURATION_SECONDS = 60 * 30;

export {
  DB_MONGO,
  PORT,
  ROUTES,
  HOMEWORLD_INDEX,
  FILMS_INDEX,
  SPECIES_INDEX,
  VEHICLES_INDEX,
  STARSHIPS_INDEX,
  PLANETS_INDEX,
  CHARACTERS_INDEX,
  RESIDENTS_INDEX,
  CACHE_DURATION_SECONDS,
};
