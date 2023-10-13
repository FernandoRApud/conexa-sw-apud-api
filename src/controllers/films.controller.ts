import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import {
  batchCharacters, batchPlanets, batchSpecies, batchStarships, batchVehicles, getAllFilms, getFilm, getFilmsByPage, getFilmsBySearch, getFilmsBySearchAndPage,
} from '../services/films.services';
import AppError, { handleAppError } from '../utils/error.utility';
import { CACHE_DURATION_SECONDS, ROUTES } from '../constants';

const cache = new NodeCache({ stdTTL: CACHE_DURATION_SECONDS });

export const getFilms = async (req: Request, res: Response) => {
  try {
    const { search, page } = req.query as { search: string, page: string };
    if (search && page) {
      const cacheKey = `${ROUTES.FILMS}$?search=${search}&page=${page}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const films = await getFilmsBySearchAndPage(search, page);
      cache.set(cacheKey, films);
      return res.status(200).json(films);
    }
    if (search) {
      const cacheKey = `${ROUTES.FILMS}$?search=${search}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const films = await getFilmsBySearch(search);
      cache.set(cacheKey, films);
      return res.status(200).json(films);
    }
    if (page) {
      const cacheKey = `${ROUTES.FILMS}$?page=${page}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const films = await getFilmsByPage(page);
      cache.set(cacheKey, films);
      return res.status(200).json(films);
    }
    if (!search && !page) {
      const cacheKey = `${ROUTES.FILMS}`;
      const cachedData = cache.get(cacheKey) as [];
      if (cachedData) return res.status(200).json(cachedData);
      const films = await getAllFilms();
      cache.set(cacheKey, films);
      return res.status(200).json(films);
    }
    throw new AppError('Invalid route');
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
export const getFilmsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const films = await getFilm(id);
    return res.status(200).json(films);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getFilmsByIdAndBatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const films = await getFilm(id);
    await Promise.all([
      await batchCharacters(films),
      await batchPlanets(films),
      await batchSpecies(films),
      await batchVehicles(films),
      await batchStarships(films),
    ]);
    return res.status(200).json(films);
  } catch (error: unknown) {
    console.error(error);
    return handleAppError(res, error);
  }
};

export const getFilmsByIdAndBatchCharacters = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const films = await getFilm(id);
    await batchCharacters(films);
    return res.status(200).json(films);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getFilmsByIdAndBatchPlanets = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const films = await getFilm(id);
    await batchPlanets(films);
    return res.status(200).json(films);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getFilmsByIdAndBatchSpecies = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const films = await getFilm(id);
    await batchSpecies(films);
    return res.status(200).json(films);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getFilmsByIdAndBatchVehicles = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const films = await getFilm(id);
    await batchVehicles(films);
    return res.status(200).json(films);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};

export const getFilmsByIdAndBatchStarships = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const films = await getFilm(id);
    await batchStarships(films);
    return res.status(200).json(films);
  } catch (error: unknown) {
    return handleAppError(res, error);
  }
};
