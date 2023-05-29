import { Issue, ErrorTypes } from '@Interfaces/Errors';

class ValidationError extends Error {
	public issue: ErrorTypes;
	public code: string;
	public status: number;
	public message: string;
	public path: string[];

	public constructor(error: ErrorTypes, code: string, status: number, message: string, path?: string[]) {
		super();
		this.issue = error;
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
