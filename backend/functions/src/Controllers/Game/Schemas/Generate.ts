import { z } from 'zod';

const Body = z.object({
	id: z.string(),
	value: z.number().optional(),
});

export { Body };
