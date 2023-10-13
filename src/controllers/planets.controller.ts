import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import AppError, { handleAppError } from '../utils/error.utility';
import {
  batchFilms, batchResidents, getAllPlanets, getPlanet, getPlanetsByPage, getPlanetsBySearch, getPlanetsBySearchAndPage,
} from '../services/planets.services';
import { CACHE_DURATION_SECONDS, ROUTES } from '../constants';

const cache = new NodeCache({ stdTTL: CACHE_DURATION_SECONDS });

export const getPlanets = async (req: Request, res: Response) => {
  try {
    const { search, page } = req.query as { search: string, page: string };
    if (search && page) {
      const cacheKey = `${ROUTES.PLANETS}$?search=${search}&page=${page}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const planets = await getPlanetsBySearchAndPage(search, page);
      cache.set(cacheKey, planets);
      return res.status(200).json(planets);
    }
    if (search) {
      const cacheKey = `${ROUTES.PLANETS}$?search=${search}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const planets = await getPlanetsBySearch(search);
      cache.set(cacheKey, planets);
      return res.status(200).json(planets);
    }
    if (page) {
      const cacheKey = `${ROUTES.PLANETS}$?page=${page}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const planets = await getPlanetsByPage(page);
      cache.set(cacheKey, planets);
      return res.status(200).json(planets);
    }
    if (!search && !page) {
      const cacheKey = `${ROUTES.PLANETS}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const planets = await getAllPlanets();
      cache.set(cacheKey, planets);
      return res.status(200).json(planets);
    }
    throw new AppError('Invalid route');
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
export const getPlanetsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const planets = await getPlanet(id);
    return res.status(200).json(planets);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getPlanetsByIdAndBatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const planets = await getPlanet(id);
    await Promise.all([
      await batchResidents(planets),
      await batchFilms(planets),
    ]);
    return res.status(200).json(planets);
  } catch (error: unknown) {
    console.error(error);
    return handleAppError(res, error);
  }
};

export const getPlanetsByIdAndBatchCharacters = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const planets = await getPlanet(id);
    await batchResidents(planets);
    return res.status(200).json(planets);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getPlanetsByIdAndBatchFilms = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const planets = await getPlanet(id);
    await batchFilms(planets);
    return res.status(200).json(planets);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
