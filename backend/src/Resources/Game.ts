import { Board } from './index';
import { Coord, GameInterface } from '@Interfaces/Game';
import { Random } from '@Utils/Random';
import { Contains } from '@Utils/Array';
import { ValidationError } from '@Errors/index';

interface GameProps {
	width: number;
	height: number;
	bombs: number;
}

export class Game implements GameInterface {
	private _width: number;
	private _height: number;
	private _bombs: number;
	private _board: Board;
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
		return this._board.GetData();
	}
	public get locations() {
		return this._locations;
	}

	public constructor(props: GameProps, assign?: GameInterface) {
		const { bombs, height, width } = assign ?? props;

		const maximum = Math.floor((height * width) / 2);
		const valid = bombs <= maximum;

		if (!valid) {
			const message = `The amount of bombs must be at maximum half of the number of squares (${maximum})`;
			throw new ValidationError('InvalidValue', 400, message, [ 'bombs' ]);
		}

		this._width = width;
		this._height = height;
		this._bombs = bombs;

		if (assign) {
			this._locations = assign.locations;
			this._board = new Board(assign.width, assign.height, assign.board);
		} else {
			this._locations = [];
			this._board = new Board(width, height);

			this.Generate();
		}
	}

	public GetData(): GameInterface {
		return {
			width: this._width,
			height: this._height,
			bombs: this._bombs,
			board: this._board.GetData(),
			locations: this._locations,
		};
	}

	public GetCell(cell: Coord) {
		return this._board.GetCell(cell);
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
			this._board.UpdateCells({ x, y });
		}
	}
}
