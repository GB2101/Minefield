import { Router } from 'express';

import { HelloController } from '@Controllers/Hello';

const router = Router();

router.get('/', HelloController);

export default router;
