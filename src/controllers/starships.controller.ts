import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import AppError, { handleAppError } from '../utils/error.utility';
import {
  batchFilms, batchPilots, getAllStarships, getStarship, getStarshipsByPage, getStarshipsBySearch, getStarshipsBySearchAndPage,
} from '../services/starships.services';
import { CACHE_DURATION_SECONDS, ROUTES } from '../constants';

const cache = new NodeCache({ stdTTL: CACHE_DURATION_SECONDS });

export const getStarships = async (req: Request, res: Response) => {
  try {
    const { search, page } = req.query as { search: string, page: string };
    if (search && page) {
      const cacheKey = `${ROUTES.STARSHIPS}$?search=${search}&page=${page}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const starship = await getStarshipsBySearchAndPage(search, page);
      cache.set(cacheKey, starship);
      return res.status(200).json(starship);
    }
    if (search) {
      const cacheKey = `${ROUTES.STARSHIPS}$?search=${search}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const starship = await getStarshipsBySearch(search);
      cache.set(cacheKey, starship);
      return res.status(200).json(starship);
    }
    if (page) {
      const cacheKey = `${ROUTES.STARSHIPS}$?page=${page}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const starship = await getStarshipsByPage(page);
      cache.set(cacheKey, starship);
      return res.status(200).json(starship);
    }
    if (!search && !page) {
      const cacheKey = `${ROUTES.STARSHIPS}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const starship = await getAllStarships();
      cache.set(cacheKey, starship);
      return res.status(200).json(starship);
    }
    throw new AppError('Invalid route');
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
export const getStarshipsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const starship = await getStarship(id);
    return res.status(200).json(starship);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getStarshipsByIdAndBatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const starship = await getStarship(id);
    await Promise.all([
      await batchPilots(starship),
      await batchFilms(starship),
    ]);
    return res.status(200).json(starship);
  } catch (error: unknown) {
    console.error(error);
    return handleAppError(res, error);
  }
};

export const getStarshipsByIdAndBatchPilots = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const starship = await getStarship(id);
    await batchPilots(starship);
    return res.status(200).json(starship);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getStarshipsByIdAndBatchFilms = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const starship = await getStarship(id);
    await batchFilms(starship);
    return res.status(200).json(starship);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
