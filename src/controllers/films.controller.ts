import { Request, Response } from 'express';
import {
  batchCharacters, batchPlanets, batchSpecies, batchStarships, batchVehicles, getAllFilms, getFilm, getFilmsByPage, getFilmsBySearch, getFilmsBySearchAndPage,
} from '../services/films.services';
import AppError, { handleAppError } from '../utils/error.utility';

export const getFilms = async (req: Request, res: Response) => {
  try {
    const { search, page } = req.query as { search: string, page: string };
    if (search && page) {
      const films = await getFilmsBySearchAndPage(search, page);
      return res.status(200).json(films);
    }
    if (search) {
      const films = await getFilmsBySearch(search);
      return res.status(200).json(films);
    }
    if (page) {
      const films = await getFilmsByPage(page);
      return res.status(200).json(films);
    }
    if (!search && !page) {
      const films = await getAllFilms();
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
