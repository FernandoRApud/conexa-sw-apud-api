import { Router } from 'express';
import {
  getSpeciesById, getSpeciesByIdAndBatch, getSpeciesByIdAndBatchPeople, getSpeciesByIdAndBatchFilms, getSpeciesFilter,
} from '../controllers/species.controller';

const router = Router();

router.get('/', getSpeciesFilter);
router.get('/:id', getSpeciesById);
router.get('/:id/batched', getSpeciesByIdAndBatch);
router.get('/:id/batched/people', getSpeciesByIdAndBatchPeople);
router.get('/:id/batched/films', getSpeciesByIdAndBatchFilms);

export default router;
