import { Request, Response } from 'express';

import { GenerateGame } from '@Functions/GenerateGame';
import { BodyType } from './Schemas/Generate';

const Generate = (req: Request, res: Response): void => {
	const { bombs, height, width } = res.locals.body as BodyType;

	const board = GenerateGame(width, height, bombs);

	res.send({ board });
};

export { Generate };
