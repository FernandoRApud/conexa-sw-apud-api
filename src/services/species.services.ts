import {
  ROUTES, FILMS_INDEX, PEOPLE_INDEX,
} from '../constants';
import { IPeople } from '../interfaces/IPeople';
import { clientAxios, passthroughFetchBatch } from '../utils/axios.utility';

export const getAllSpecies = async (search?: string) => {
  const species = search ? await clientAxios.get(`${ROUTES.SPECIES}?search=${search}`) : await clientAxios.get(`${ROUTES.SPECIES}`);
  return species.data;
};

export const getSpecies = async (id: string) => {
  const species = await clientAxios.get(`${ROUTES.SPECIES}/${id}`);
  return species.data;
};

export const batchPeople = async (speciesData: IPeople) => {
  const batchedData = await passthroughFetchBatch(speciesData, PEOPLE_INDEX);
  return batchedData;
};

export const batchFilms = async (speciesData: IPeople) => {
  const batchedData = await passthroughFetchBatch(speciesData, FILMS_INDEX);
  return batchedData;
};
