import { Board, Move } from './index';
import { Random } from '@Utils/Random';
import { Contains } from '@Utils/Array';
import { ValidationError } from '@Errors/index';
import { Coord, GameInterface, Status, Movement } from '@Interfaces/Game';

interface GameProps {
	width: number;
	height: number;
	bombs: number;
}

export class Game implements GameInterface {
	private _board: Board;
	private _bombs: number;
	private _width: number;
	private _height: number;
	private _status: Status;
	private _locations: Coord[];
	private _movements: Movement[];

	public get width() {
		return this._width;
	}
	public get height() {
		return this._height;
	}
	public get bombs() {
		return this._bombs;
	}
	public get status() {
		return this._status;
	}
	public get board() {
		return this._board.GetData();
	}
	public get locations() {
		return this._locations;
	}
	public get movements() {
		return this._movements;
	}

	public constructor(props: GameProps, assign?: GameInterface) {
		const { bombs, height, width } = assign ?? props;

		const maximum = Math.floor((height * width) / 2);
		const valid = bombs <= maximum;

		if (!valid) {
			const message = `The amount of bombs must be at maximum half of the number of squares (${maximum})`;
			throw new ValidationError('InvalidValue', 400, message, [ 'bombs' ]);
		}

		this._status = assign?.status ?? 'Playing';
		this._bombs = bombs;
		this._width = width;
		this._height = height;

		if (assign) {
			this._locations = [ ...assign.locations ];
			this._movements = [ ...assign.movements ];
			this._board = new Board(assign.width, assign.height, assign.board);
		} else {
			this._locations = [];
			this._movements = [];
			this._board = new Board(width, height);

			this.Generate();
		}
	}

	public GetData(): GameInterface {
		return {
			bombs: this._bombs,
			width: this._width,
			height: this._height,
			status: this._status,
			board: this._board.GetData(),
			locations: this._locations,
			movements: this._movements,
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
			this._board.MarkBombs({ x, y });
		}
	}

	public MakeMove(coord: Coord, flags?: Coord[]) {
		const move = new Move(this._board, coord, flags);

		if (move.status !== 'Lost') {
			const won = this.CheckFinished();
			move.SetWon(won);
		}

		const movement = move.GetMovement();

		this._movements.push(movement);
		return movement;
	}

	public CheckFinished() {
		const opened = this._board.CountOpen();
		const total = (this._width * this._height) - this._bombs;

		return opened === total;
	}
}
