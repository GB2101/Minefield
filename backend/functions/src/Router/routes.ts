import { Router } from 'express';

import { Validate } from '@Middlewares/Validate';

import { HelloController } from '@Controllers/Hello';
import { GameCtrl, GameSchemas } from '@Controllers/Game';

const router = Router();

router.get('/', HelloController);
router.post('/game', Validate(GameSchemas.Generate.Body), GameCtrl.Generate);

export default router;
