import { Issue, ErrorTypes } from '@Interfaces/Errors';

class ValidationError extends Error implements Issue {
	public code;
	public status: number;
	public message: string;
	public path: string[];

	public constructor(code: ErrorTypes, status: number, message: string, path?: string[]) {
		super();
		this.code = code;
		this.status = status;
		this.message = message;
		this.path = path ?? [];
	}

	public GetIssue(): Issue {
		return {
			code: this.code,
			message: this.message,
			path: this.path,
		};
	}
}

export { ValidationError };
