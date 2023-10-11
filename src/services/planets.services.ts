import {
  ROUTES, FILMS_INDEX, RESIDENTS_INDEX,
} from '../constants';
import { IPeople } from '../interfaces/IPeople';
import { clientAxios, passthroughFetchBatch } from '../utils/axios.utility';

export const getAllPlanets = async (search?: string) => {
  const planet = search ? await clientAxios.get(`${ROUTES.PLANETS}?search=${search}`) : await clientAxios.get(`${ROUTES.PLANETS}`);
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
