import { Request, Response } from 'express';

interface Test {
	id: string;
	value: number;
}

type Void = Record<string, never>;

const Generate = (req: Request<Void, Void, Test>, res: Response): void => {
	const { body } = req;

	console.log(body.id);

	res.send({ body });
};

export { Generate };
