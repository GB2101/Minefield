import { z } from 'zod';

const Body = z.object({
	coordX: z.number().positive().max(50),
	coordY: z.number().positive().max(50),
});

export const MoveSchemas = { Body };
export type MoveBodyType = z.infer<typeof Body>;
