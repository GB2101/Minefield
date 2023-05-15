interface DataBase<T> {
	write: (location: string, data: T) => void;
	read: (location: string) => T;
}

export type { DataBase };
