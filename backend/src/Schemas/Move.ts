import { z } from 'zod';

import { Limit } from '@Mappings/Limits';

const Body = z.object({
	coord_x: z.number().min(0).max(Limit.max_size),
	coord_y: z.number().min(0).max(Limit.max_size),
	flags: z.array(z.object({
		coord_x: z.number().min(0).max(Limit.max_size),
		coord_y: z.number().min(0).max(Limit.max_size),
	})).optional(),
});

export const MoveSchemas = { Body };
export type MoveBodyType = z.infer<typeof Body>;
