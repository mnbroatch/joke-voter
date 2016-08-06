import { Router } from 'express';
const router = Router();

import jokes from './jokes';

router.use('/jokes', jokes);

export default router;
