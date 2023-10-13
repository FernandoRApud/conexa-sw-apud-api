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
const PEOPLE_INDEX = 'people';
const PILOTS_INDEX = 'pilots';
const CACHE_DURATION_SECONDS = Number(process.env.CACHE_DURATION_SECONDS ?? 60 * 30);

export {
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
  PEOPLE_INDEX,
  PILOTS_INDEX,
  CACHE_DURATION_SECONDS,
};
