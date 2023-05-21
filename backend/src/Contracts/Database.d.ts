import { Data } from '@Interfaces/Game';

interface DataBase<T extends Data> {
	write: (data: T, location: string, document?: string) => Promise<string>;
	update: (data: Partial<T>, location: string, document: string) => Promise<void>;
	read: (location: string, document: string) => Promise<T>;
}

export type { DataBase };
