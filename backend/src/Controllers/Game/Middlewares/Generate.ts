import { Request, Response, NextFunction } from 'express';
import { Error400 } from '@Interfaces/Errors';
import { BodyType } from '../Schemas/Generate';

const BodyValues = (req: Request, res: Response, next: NextFunction): void => {
	const { bombs, height, width } = res.locals.body as BodyType;

	const maximum = Math.floor((height * width) / 2);
	const valid = bombs <= maximum;

	if (valid) {
		next();
		return;
	}

	const response: Error400 = {
		error: 'ServerInvalidValue',
		issues: [
			{
				code: 'invalid_value',
				message: `The amount of bombs must be less then or equal to half of the number of squares (${maximum})`,
				path: [ 'bombs' ],
			},
		],
	};

	res.status(400).send(response);
};

export const Middlewares = { BodyValues };
