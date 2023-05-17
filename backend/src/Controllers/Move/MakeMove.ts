import { Handler } from '@Interfaces/Request';

const MakeMove: Handler = (req, res) => {
	res.send({ Hello: 'World' });
};

export { MakeMove };
