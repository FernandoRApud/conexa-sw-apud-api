import { Request, Response } from 'express';
import AppError, { handleAppError } from '../utils/error.utility';
import {
  batchFilms, batchResidents, getAllPlanets, getPlanet, getPlanetsByPage, getPlanetsBySearch, getPlanetsBySearchAndPage,
} from '../services/planets.services';

export const getPlanets = async (req: Request, res: Response) => {
  try {
    const { search, page } = req.query as { search: string, page: string };
    if (search && page) {
      const planets = await getPlanetsBySearchAndPage(search, page);
      return res.status(200).json(planets);
    }
    if (search) {
      const planets = await getPlanetsBySearch(search);
      return res.status(200).json(planets);
    }
    if (page) {
      const planets = await getPlanetsByPage(page);
      return res.status(200).json(planets);
    }
    if (!search && !page) {
      const planets = await getAllPlanets();
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
