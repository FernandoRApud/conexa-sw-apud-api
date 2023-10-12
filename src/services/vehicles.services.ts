import {
  ROUTES, FILMS_INDEX, PILOTS_INDEX,
} from '../constants';
import { IPeople } from '../interfaces/IPeople';
import { clientAxios, passthroughFetchBatch } from '../utils/axios.utility';

export const getAllVehicles = async () => {
  const vehicle = await clientAxios.get(`${ROUTES.VEHICLES}`);
  return vehicle.data;
};

export const getVehiclesByPage = async (page: string) => {
  const vehicle = await clientAxios.get(`${ROUTES.VEHICLES}?page=${page}`);
  return vehicle.data;
};

export const getVehiclesBySearch = async (search: string) => {
  const vehicle = await clientAxios.get(`${ROUTES.VEHICLES}?search=${search}`);
  return vehicle.data;
};

export const getVehiclesBySearchAndPage = async (search: string, page: string) => {
  const vehicle = await clientAxios.get(`${ROUTES.VEHICLES}?search=${search}&page=${page}`);
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
