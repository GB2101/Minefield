import { Request, Response } from 'express';
import { BodyType } from './Schemas/Generate';

const Generate = (req: Request, res: Response): void => {
	const body = res.locals.body as BodyType;

	// console.log(body.id);

	res.send({ body });
};

export { Generate };
