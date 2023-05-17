import { Data } from '@Interfaces/Game';
import { DataBase } from '@Contracts/Database';

class GameService<T extends Data> {
	private database: DataBase<T>;

	public constructor(db: DataBase<T>) {
		this.database = db;
	}

	public async Generate(data: T, location: string, document?: string) {
		const id = await this.database.write(data, location, document);
		return id;
	}
}

export { GameService };
