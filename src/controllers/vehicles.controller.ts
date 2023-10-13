import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import AppError, { handleAppError } from '../utils/error.utility';
import {
  batchFilms, batchPilots, getAllVehicles, getVehicle, getVehiclesByPage, getVehiclesBySearch, getVehiclesBySearchAndPage,
} from '../services/vehicles.services';
import { CACHE_DURATION_SECONDS, ROUTES } from '../constants';

const cache = new NodeCache({ stdTTL: CACHE_DURATION_SECONDS });

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const { search, page } = req.query as { search: string, page: string };
    if (search && page) {
      const cacheKey = `${ROUTES.VEHICLES}$?search=${search}&page=${page}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const vehicle = await getVehiclesBySearchAndPage(search, page);
      cache.set(cacheKey, vehicle);
      return res.status(200).json(vehicle);
    }
    if (search) {
      const cacheKey = `${ROUTES.VEHICLES}$?search=${search}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const vehicle = await getVehiclesBySearch(search);
      cache.set(cacheKey, vehicle);
      return res.status(200).json(vehicle);
    }
    if (page) {
      const cacheKey = `${ROUTES.VEHICLES}$?page=${page}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const vehicle = await getVehiclesByPage(page);
      cache.set(cacheKey, vehicle);
      return res.status(200).json(vehicle);
    }
    if (!search && !page) {
      const cacheKey = `${ROUTES.VEHICLES}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const vehicle = await getAllVehicles();
      cache.set(cacheKey, vehicle);
      return res.status(200).json(vehicle);
    }
    throw new AppError('Invalid route');
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
export const getVehiclesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await getVehicle(id);
    return res.status(200).json(vehicle);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getVehiclesByIdAndBatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await getVehicle(id);
    await Promise.all([
      await batchPilots(vehicle),
      await batchFilms(vehicle),
    ]);
    return res.status(200).json(vehicle);
  } catch (error: unknown) {
    console.error(error);
    return handleAppError(res, error);
  }
};

export const getVehiclesByIdAndBatchPilots = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await getVehicle(id);
    await batchPilots(vehicle);
    return res.status(200).json(vehicle);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getVehiclesByIdAndBatchFilms = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await getVehicle(id);
    await batchFilms(vehicle);
    return res.status(200).json(vehicle);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
