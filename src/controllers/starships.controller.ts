import { Request, Response } from 'express';
import AppError, { handleAppError } from '../utils/error.utility';
import {
  batchFilms, batchPilots, getAllStarships, getStarship, getStarshipsByPage, getStarshipsBySearch, getStarshipsBySearchAndPage,
} from '../services/starships.services';

export const getStarships = async (req: Request, res: Response) => {
  try {
    const { search, page } = req.query as { search: string, page: string };
    if (search && page) {
      const starship = await getStarshipsBySearchAndPage(search, page);
      return res.status(200).json(starship);
    }
    if (search) {
      const starship = await getStarshipsBySearch(search);
      return res.status(200).json(starship);
    }
    if (page) {
      const starship = await getStarshipsByPage(page);
      return res.status(200).json(starship);
    }
    if (!search && !page) {
      const starship = await getAllStarships();
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
