import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { Request, Response, NextFunction } from 'express';

type Zod = z.ZodTypeAny;
type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type Factory = <T extends Zod>(schemas: T) => Middleware;

const Validate: Factory = <T extends Zod>(schema: T) => (req, res, next) => {
	try {
		const parse = schema.parse(req.body);

		res.locals = { body: parse };
		next();
	} catch (error) {
		if (error instanceof z.ZodError) {
			const { details } = fromZodError(error);

			res.status(400).send({
				success: false,
				error: fromZodError(error).name,
				errors: details,
			});
		} else {
			res.status(500).send({
				success: false,
				error: 'Unknown',
				message: 'Please, file a bug report so we are able to investigate further on this matter.',
			});
		}
	}
};

export { Validate };
