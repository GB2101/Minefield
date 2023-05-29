import { z } from 'zod';

const Body = z.object({
	width: z.number().min(5).max(50),
	height: z.number().min(5).max(50),
	bombs: z.number().min(10),
});

export const GameSchemas = { Body };
export type GameBodyType = z.infer<typeof Body>;
