import {
  FILMS_INDEX, HOMEWORLD_INDEX, ROUTES, SPECIES_INDEX, STARSHIPS_INDEX, VEHICLES_INDEX,
} from '../constants';
import { IPeople } from '../interfaces/IPeople';
import { clientAxios, passthroughFetchBatch } from '../utils/axios.utility';

export const getPeople = async (id: string) => {
  const people = await clientAxios.get(`${ROUTES.PEOPLE}/${id}`);
  return people.data;
};

export const batchHomeworld = async (peopleData: IPeople) => {
  const batchedData = await passthroughFetchBatch(peopleData, HOMEWORLD_INDEX);
  return batchedData;
};
export const batchFilms = async (peopleData: IPeople) => {
  const batchedData = await passthroughFetchBatch(peopleData, FILMS_INDEX);
  return batchedData;
};
export const batchSpecies = async (peopleData: IPeople) => {
  const batchedData = await passthroughFetchBatch(peopleData, SPECIES_INDEX);
  return batchedData;
};
export const batchVehicles = async (peopleData: IPeople) => {
  const batchedData = await passthroughFetchBatch(peopleData, VEHICLES_INDEX);
  return batchedData;
};
export const batchStarships = async (peopleData: IPeople) => {
  const batchedData = await passthroughFetchBatch(peopleData, STARSHIPS_INDEX);
  return batchedData;
};
