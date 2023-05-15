import { Request, Response } from 'express';

const HelloController = (req: Request, res: Response): void => {
	res.status(418).send({ message: 'Hello World!' });
};

export { HelloController };
