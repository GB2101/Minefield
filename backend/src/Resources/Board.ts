import { Cell } from './Cell';
import { CellInterface, Coord } from '@Interfaces/Game';

export class Board {
	private items: Cell[];
	private width: number;
	private height: number;

	public get Width() {
		return this.width;
	}
	public get Height() {
		return this.height;
	}

	public constructor(width: number, height: number, assign?: CellInterface[]) {
		this.items = [];
		this.width = width;
		this.height = height;

		const limit = this.width * this.height;
		if (assign) {
			for (let x = 0; x < limit; x++) {
				this.items[x] = new Cell({ x: 0, y: 0 }, assign[x]);
			}
		} else {
			for (let x = 0; x < limit; x++) {
				this.items[x] = new Cell({ x: 0, y: 0 });
			}
		}
		for (let i = 0; i < limit; i++) {
			const coord = { x: Math.floor(i / height), y: i % height };
			if (assign) {
				this.items[i] = new Cell(coord, assign[i]);
			} else {
				this.items[i] = new Cell(coord);
			}
		}
	}

	public CountOpen(): number {
		let count = 0;
		for (const cell of this.items) {
			if (cell.state === 'open' && !cell.bomb) {
				count++;
			}
		}

		return count;
	}

	public GetData(): CellInterface[] {
		return this.items.map(cell => cell.GetData());
	}

	public GetCell(cell: Coord) {
		return this.items[(cell.x * this.height) + cell.y];
	}

	public Outside(coord: Coord) {
		if (coord.x < 0 || coord.x >= this.width) {
			return true;
		}

		if (coord.y < 0 || coord.y >= this.height) {
			return true;
		}

		return false;
	}

	public UpdateCells(cell: Coord, update: (cell: Coord) => void) {
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

		for (const space of spaces) {
			const x = cell.x + space.x;
			const y = cell.y + space.y;

			if (this.Outside({ x, y })) {
				continue;
			}

			update({ x, y });
		}
	}

	public MarkBombs(bomb: Coord) {
		this.GetCell(bomb).MakeBomb();

		this.UpdateCells(bomb, cell => {
			if (this.GetCell(cell).bomb) {
				return;
			}

			this.GetCell(cell).Increment();
		});
	}
}
