import { z } from 'zod';

const Params = z.object({
	id: z.string().length(20),
});

const Body = z.object({
	coordX: z.number().positive().max(50),
	coordY: z.number().positive().max(50),
});

export const Schemas = { Body, Params };
export type BodyType = z.infer<typeof Body>;
export type ParamsType = z.infer<typeof Params>;
