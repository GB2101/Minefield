import { Cell } from './Cell';
import { CellInterface, Coord } from '@Interfaces/Game';

class Board {
	private items: Cell[];
	private width: number;
	private height: number;

	public constructor(width: number, height: number) {
		this.items = [];
		this.width = width;
		this.height = height;

		const limit = this.width * this.height;
		for (let x = 0; x < limit; x++) {
			this.items[x] = new Cell();
		}
	}

	// private Index(x: number, y: number): number {
	// 	return (x * this.width) + y;
	// }

	public GetData(): CellInterface[] {
		return this.items.map(cell => cell.GetData());
	}

	public GetCell(cell: Coord) {
		return this.items[(cell.x * this.width) + cell.y];
	}

	public UpdateCells(bomb: Coord) {
		const spaces = [
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 1, y: 0 },
			{ x: 1, y: -1 },
			{ x: 0, y: -1 },
			{ x: -1, y: -1 },
			{ x: -1, y: 0 },
			{ x: -1, y: 1 },
		];

		this.GetCell(bomb).MakeBomb();
		for (const space of spaces) {
			const x = bomb.x + space.x;
			const y = bomb.y + space.y;

			if (x < 0 || x >= this.width) {
				continue;
			}

			if (y < 0 || y >= this.height) {
				continue;
			}

			if (this.GetCell({ x, y }).bomb) {
				continue;
			}

			this.GetCell({ x, y }).Increment();
		}
	}
}

export { Board };
