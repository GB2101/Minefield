import { ZodIssue } from 'zod';

interface Issue {
	code: 'invalid_value';
	message: string;
	path: string[];
}

interface Error400 {
	error: string;
	issues: Array<ZodIssue | Issue>;
}

interface Error500 {
	error: string;
	message: string;
}

export type { Error400, Error500 };
