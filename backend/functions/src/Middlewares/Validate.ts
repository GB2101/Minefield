import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { Request, Response, NextFunction } from 'express';

type Zod = z.ZodTypeAny;
interface SchemaObject<T extends Zod, U extends Zod, V extends Zod> {
	body?: T;
	query?: U;
	params?: V;
}

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type ValidateType = <T extends Zod, U extends Zod, V extends Zod>(schemas: SchemaObject<T, U, V>) => Middleware;

const Validate: ValidateType = <T extends Zod, U extends Zod, V extends Zod>(schema: SchemaObject<T, U, V>) => {
	const { body, params, query } = schema;

	return (req, res, next) => {
		if (body) {
			const parser = body.safeParse(req.body);

			if (!parser.success) {
				console.log(fromZodError(parser.error).message);
				res.status(400).send({ message: 'Error' });
				return;
			}
		}

		next();
	};
};

export { Validate };
