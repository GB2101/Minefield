import { z } from 'zod';

const Body = z.object({
	coordX: z.number().positive().max(50),
	coordY: z.number().positive().max(50),
});

export { Body };
export type BodyType = z.infer<typeof Body>;
