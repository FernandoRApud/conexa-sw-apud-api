import { Router } from 'express';
import {
  getStarships, getStarshipsById, getStarshipsByIdAndBatch, getStarshipsByIdAndBatchFilms, getStarshipsByIdAndBatchPilots,
} from '../controllers/starships.controller';

const router = Router();

router.get('/', getStarships);
router.get('/:id', getStarshipsById);
router.get('/:id/batched', getStarshipsByIdAndBatch);
router.get('/:id/batched/pilots', getStarshipsByIdAndBatchPilots);
router.get('/:id/batched/films', getStarshipsByIdAndBatchFilms);

export default router;
