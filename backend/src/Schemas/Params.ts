import { z } from 'zod';

const Params = z.object({
	id: z.string().length(20),
});

export const Request = { Params };
export type IDParamsType = z.infer<typeof Params>;
