import { Request, Response } from 'express';

import { Game } from '@Resources/Game';
import { BodyType } from './Schemas/Generate';

const Generate = (req: Request, res: Response): void => {
	const { bombs, height, width } = res.locals.body as BodyType;

	const game = new Game({ width, height, bombs });
	game.Generate();

	res.send({ game });
};

export { Generate };
