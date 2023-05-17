import { Data } from '@Interfaces/Game';

interface DataBase<T extends Data> {
	write: (data: T, location: string, document?: string) => Promise<string>;
	read: (location: string, document: string) => Promise<T>;
}

export type { DataBase };
