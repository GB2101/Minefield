import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { Request, Response, NextFunction } from 'express';

import { Error400, Error500 } from '@Interfaces/Errors';

type Zod = z.ZodTypeAny;
type Data = 'body' | 'query' | 'params';
type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type Factory = <T extends Zod>(schemas: T, data: Data) => Middleware;

const Validate: Factory = <T extends Zod>(schema: T, data: Data) => (req, res, next) => {
	try {
		const parse = schema.parse(req[data]);

		res.locals[data] = parse;
		next();
	} catch (error) {
		if (error instanceof z.ZodError) {
			const { details } = fromZodError(error);

			const response: Error400 = {
				error: fromZodError(error).name,
				issues: details,
			};

			res.status(400).send(response);
		} else {
			const response: Error500 = {
				error: 'Unknown',
				message: 'Please, file a bug report so we are able to investigate further on this matter.',
			};

			res.status(500).send(response);
		}
	}
};

export { Validate };
