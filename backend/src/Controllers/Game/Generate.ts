import { Request, Response } from 'express';

import { Game } from '@Resources/Game';
import { BodyType } from './Schemas/Generate';
import { Error400, Error500 } from '@Interfaces/Errors';
import { ErrorInvalidArgs } from '@Errors/ErrorInvalidArgs';

const Generate = (req: Request, res: Response): void => {
	const { bombs, height, width } = res.locals.body as BodyType;

	try {
		const game = new Game({ width, height, bombs });
		game.Generate();

		res.send({ game });
	} catch (error) {
		if (error instanceof ErrorInvalidArgs) {
			res.status(400).send({
				error: 'InvalidArgument',
				issues: [ error ],
			} as Error400);
		}
	}
};

export { Generate };
