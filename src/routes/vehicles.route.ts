import { Router } from 'express';
import {
  getVehicles, getVehiclesById, getVehiclesByIdAndBatch, getVehiclesByIdAndBatchFilms, getVehiclesByIdAndBatchPilots,
} from '../controllers/vehicles.controller';

const router = Router();

router.get('/', getVehicles);
router.get('/:id', getVehiclesById);
router.get('/:id/batched', getVehiclesByIdAndBatch);
router.get('/:id/batched/pilots', getVehiclesByIdAndBatchPilots);
router.get('/:id/batched/films', getVehiclesByIdAndBatchFilms);

export default router;
