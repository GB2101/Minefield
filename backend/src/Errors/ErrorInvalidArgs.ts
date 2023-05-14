import { Issue } from '@Interfaces/Errors';

class ErrorInvalidArgs extends Error implements Issue {
	public code = 'invalid_value' as const;
	public message: string;
	public path: string[];

	public constructor(message: string, path: string[]) {
		super();
		this.message = message;
		this.path = path;
	}
}

export { ErrorInvalidArgs };
