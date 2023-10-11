import {
  CHARACTERS_INDEX, PLANETS_INDEX, ROUTES, SPECIES_INDEX, STARSHIPS_INDEX, VEHICLES_INDEX,
} from '../constants';
import { IPeople } from '../interfaces/IPeople';
import { clientAxios, passthroughFetchBatch } from '../utils/axios.utility';

export const getAllFilms = async (search?: string) => {
  const film = search ? await clientAxios.get(`${ROUTES.FILMS}?search=${search}`) : await clientAxios.get(`${ROUTES.FILMS}`);
  return film.data;
};

export const getFilm = async (id: string) => {
  const film = await clientAxios.get(`${ROUTES.FILMS}/${id}`);
  return film.data;
};

export const batchCharacters = async (filmData: IPeople) => {
  const batchedData = await passthroughFetchBatch(filmData, CHARACTERS_INDEX);
  return batchedData;
};

export const batchPlanets = async (filmData: IPeople) => {
  const batchedData = await passthroughFetchBatch(filmData, PLANETS_INDEX);
  return batchedData;
};
export const batchSpecies = async (filmData: IPeople) => {
  const batchedData = await passthroughFetchBatch(filmData, SPECIES_INDEX);
  return batchedData;
};
export const batchVehicles = async (filmData: IPeople) => {
  const batchedData = await passthroughFetchBatch(filmData, VEHICLES_INDEX);
  return batchedData;
};
export const batchStarships = async (filmData: IPeople) => {
  const batchedData = await passthroughFetchBatch(filmData, STARSHIPS_INDEX);
  return batchedData;
};
