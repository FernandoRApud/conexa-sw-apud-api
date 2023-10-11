import { Request, Response } from 'express';
import { handleAppError } from '../utils/error.utility';
import {
  batchFilms, batchResidents, getAllPlanets, getPlanet,
} from '../services/planets.services';

export const getPlanets = async (req: Request, res: Response) => {
  try {
    const { search } = req.query as { search: string };
    const planets = search ? await getAllPlanets(search) : await getAllPlanets();
    return res.status(200).json(planets);
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
