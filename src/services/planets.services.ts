import {
  ROUTES, FILMS_INDEX, RESIDENTS_INDEX,
} from '../constants';
import { IPeople } from '../interfaces/IPeople';
import { clientAxios, passthroughFetchBatch } from '../utils/axios.utility';

export const getAllPlanets = async () => {
  const planet = await clientAxios.get(`${ROUTES.PLANETS}`);
  return planet.data;
};

export const getPlanetsByPage = async (page: string) => {
  const planet = await clientAxios.get(`${ROUTES.PLANETS}?page=${page}`);
  return planet.data;
};

export const getPlanetsBySearch = async (search: string) => {
  const planet = await clientAxios.get(`${ROUTES.PLANETS}?search=${search}`);
  return planet.data;
};

export const getPlanetsBySearchAndPage = async (search: string, page: string) => {
  const planet = await clientAxios.get(`${ROUTES.PLANETS}?search=${search}&page=${page}`);
  return planet.data;
};

export const getPlanet = async (id: string) => {
  const planet = await clientAxios.get(`${ROUTES.PLANETS}/${id}`);
  return planet.data;
};

export const batchResidents = async (planetData: IPeople) => {
  const batchedData = await passthroughFetchBatch(planetData, RESIDENTS_INDEX);
  return batchedData;
};

export const batchFilms = async (planetData: IPeople) => {
  const batchedData = await passthroughFetchBatch(planetData, FILMS_INDEX);
  return batchedData;
};
