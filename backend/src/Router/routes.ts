import { Router } from 'express';

import { Validate } from '@Middlewares/Validate';

import { HelloController } from '@Controllers/Hello';
import { GameController, GameSchemas } from '@Controllers/Game';
import { MoveController, MoveSchemas, MoveFunctions } from '@Controllers/Move';

const router = Router();

router.get('/', HelloController);

router.post('/game', Validate(GameSchemas.Generate.Body, 'body'), GameController.Generate);
router.post(
	'/game/:id',
	Validate(MoveSchemas.MakeMove.Params, 'params'),
	Validate(MoveSchemas.MakeMove.Body, 'body'),
	MoveFunctions.ValidateId(),
	MoveController.MakeMove,
);

export default router;
