import { DataBase } from '@Contracts/Database';
import { Data } from '@Interfaces/Game';
import { ValidationError } from '@Errors/Error';
import { GenerateID } from '@Utils/GenerateID';

type collection<T> = Record<string, T>;

export class Mock<T extends Data> implements DataBase<T> {
	private database: collection<T> = {};

	public write(data: T, location: string, document?: string): Promise<string> {
		const id = document ?? GenerateID(20);
		const key = `${location}/${id}`;

		this.database[key] = data;

		return new Promise(resolver => resolver(id));
	}

	public update(data: Partial<T>, location: string, document: string): Promise<void> {
		const key = `${location}/${document}`;

		for (const field in data) {
			this.database[key][field] = data[field]!;
		}

		return new Promise(resolver => resolver());
	}

	public read(location: string, document: string): Promise<T> {
		const key = `${location}/${document}`;

		const data = this.database[key];

		return new Promise(resolver => resolver(data));
	}
}
