import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import AppError, { handleAppError } from '../utils/error.utility';
import {
  batchFilms, batchPeople, getAllSpecies, getSpecies, getSpeciesByPage, getSpeciesBySearch, getSpeciesBySearchAndPage,
} from '../services/species.services';
import { CACHE_DURATION_SECONDS, ROUTES } from '../constants';

const cache = new NodeCache({ stdTTL: CACHE_DURATION_SECONDS });

export const getSpeciesFilter = async (req: Request, res: Response) => {
  try {
    const { search, page } = req.query as { search: string, page: string };
    if (search && page) {
      const cacheKey = `${ROUTES.SPECIES}$?search=${search}&page=${page}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const species = await getSpeciesBySearchAndPage(search, page);
      cache.set(cacheKey, species);
      return res.status(200).json(species);
    }
    if (search) {
      const cacheKey = `${ROUTES.SPECIES}$?search=${search}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const species = await getSpeciesBySearch(search);
      cache.set(cacheKey, species);
      return res.status(200).json(species);
    }
    if (page) {
      const cacheKey = `${ROUTES.SPECIES}$?page=${page}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const species = await getSpeciesByPage(page);
      cache.set(cacheKey, species);
      return res.status(200).json(species);
    }
    if (!search && !page) {
      const cacheKey = `${ROUTES.SPECIES}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const species = await getAllSpecies();
      cache.set(cacheKey, species);
      return res.status(200).json(species);
    }
    throw new AppError('Invalid route');
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
export const getSpeciesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const species = await getSpecies(id);
    return res.status(200).json(species);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getSpeciesByIdAndBatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const species = await getSpecies(id);
    await Promise.all([
      await batchPeople(species),
      await batchFilms(species),
    ]);
    return res.status(200).json(species);
  } catch (error: unknown) {
    console.error(error);
    return handleAppError(res, error);
  }
};

export const getSpeciesByIdAndBatchPeople = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const species = await getSpecies(id);
    await batchPeople(species);
    return res.status(200).json(species);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getSpeciesByIdAndBatchFilms = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const species = await getSpecies(id);
    await batchFilms(species);
    return res.status(200).json(species);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
