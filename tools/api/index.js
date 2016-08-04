import { Router } from 'express';
const router = Router();

import jokes from './jokes';
import users from './users';

router.use('/jokes', jokes);
router.use('/users', users);

export default router;
