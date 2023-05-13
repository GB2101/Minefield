import { z } from 'zod';

const Body = z.object({
	seed: z.string().min(5),
	width: z.number().min(5).max(100),
	height: z.number().min(5).max(100),
	bombs: z.number().min(10),
});

export const Schemas = { Body };
export type BodyType = z.infer<typeof Body>;
