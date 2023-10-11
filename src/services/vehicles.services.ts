import {
  ROUTES, FILMS_INDEX, PILOTS_INDEX,
} from '../constants';
import { IPeople } from '../interfaces/IPeople';
import { clientAxios, passthroughFetchBatch } from '../utils/axios.utility';

export const getAllVehicles = async (search?: string) => {
  const vehicle = search ? await clientAxios.get(`${ROUTES.VEHICLES}?search=${search}`) : await clientAxios.get(`${ROUTES.VEHICLES}`);
  return vehicle.data;
};

export const getVehicle = async (id: string) => {
  const vehicle = await clientAxios.get(`${ROUTES.VEHICLES}/${id}`);
  return vehicle.data;
};

export const batchPilots = async (vehicleData: IPeople) => {
  const batchedData = await passthroughFetchBatch(vehicleData, PILOTS_INDEX);
  return batchedData;
};

export const batchFilms = async (vehicleData: IPeople) => {
  const batchedData = await passthroughFetchBatch(vehicleData, FILMS_INDEX);
  return batchedData;
};
