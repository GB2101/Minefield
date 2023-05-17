import { ZodIssue } from 'zod';

type ErrorTypes = 'InvalidValue' | 'IdNotFound';

interface Issue {
	code: ErrorTypes;
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

export type { ErrorTypes, Issue, Error400, Error500 };
