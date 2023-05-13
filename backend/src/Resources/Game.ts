import { Cell } from './Cell';
import { Coord } from '@Interfaces/Game';
import { Random } from '@Utils/Random';
import { Contains } from '@Utils/Array';

interface GameProps {
	width: number;
	height: number;
	bombs: number;
}

export class Game {
	private _width: number;
	private _height: number;
	private _bombs: number;
	private _board: Cell[][];
	private _locations: Coord[];

	public get width() {
		return this._width;
	}
	public get height() {
		return this._height;
	}
	public get bombs() {
		return this._bombs;
	}
	public get board() {
		return this._board;
	}
	public get locations() {
		return this._locations;
	}

	public constructor(props: GameProps) {
		this._width = props.width;
		this._height = props.height;
		this._bombs = props.bombs;
		this._board = [];
		this._locations = [];

		for (let x = 0; x < this._width; x++) {
			this._board[x] = [];
			for (let y = 0; y < this._height; y++) {
				this._board[x][y] = new Cell();
			}
		}
	}

	public Generate() {
		let x: number, y: number;
		for (let i = 0; i < this._bombs; i++) {
			x = Random(this._width);
			y = Random(this._height);

			while (Contains({ x, y }, this._locations)) {
				x = Random(this._width);
				y = Random(this._height);
			}

			this._locations.push({ x, y });
			this.UpdateCells({ x, y });
		}
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

		this._board[bomb.x][bomb.y].MakeBomb();
		for (const space of spaces) {
			const x = bomb.x + space.x;
			const y = bomb.y + space.y;

			if (x < 0 || x >= this._width) {
				continue;
			}

			if (y < 0 || y >= this._height) {
				continue;
			}

			if (this._board[x][y].bomb) {
				continue;
			}

			this._board[x][y].Increment();
		}
	}
}
