import { Request, Response } from 'express';
import { handleAppError } from '../utils/error.utility';
import {
  batchFilms, batchPilots, getAllVehicles, getVehicle,
} from '../services/vehicles.services';

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const { search } = req.query as { search: string };
    const vehicle = search ? await getAllVehicles(search) : await getAllVehicles();
    return res.status(200).json(vehicle);
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
