import express from 'express';

import peopleRoutes from './people.route';
import filmsRoutes from './films.route';
import planetsRoutes from './planets.route';
import speciesRoutes from './species.route';
import starshipsRoutes from './starships.route';
import vehiclesRoutes from './vehicles.route';

const router = express.Router();

router.use('/people', peopleRoutes);
router.use('/films', filmsRoutes);
router.use('/planets', planetsRoutes);
router.use('/species', speciesRoutes);
router.use('/starships', starshipsRoutes);
router.use('/vehicles', vehiclesRoutes);

export default router;
