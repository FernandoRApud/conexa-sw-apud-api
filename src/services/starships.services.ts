import {
  ROUTES, FILMS_INDEX, PILOTS_INDEX,
} from '../constants';
import { IPeople } from '../interfaces/IPeople';
import { clientAxios, passthroughFetchBatch } from '../utils/axios.utility';

export const getAllStarships = async (search?: string) => {
  const starship = search ? await clientAxios.get(`${ROUTES.STARSHIPS}?search=${search}`) : await clientAxios.get(`${ROUTES.STARSHIPS}`);
  return starship.data;
};

export const getStarship = async (id: string) => {
  const starship = await clientAxios.get(`${ROUTES.STARSHIPS}/${id}`);
  return starship.data;
};

export const batchPilots = async (starshipData: IPeople) => {
  const batchedData = await passthroughFetchBatch(starshipData, PILOTS_INDEX);
  return batchedData;
};

export const batchFilms = async (starshipData: IPeople) => {
  const batchedData = await passthroughFetchBatch(starshipData, FILMS_INDEX);
  return batchedData;
};
