import { CellInterface, Coord } from '@Interfaces/Game';

export class Cell implements CellInterface {
	private _bomb: boolean;
	private _state: 'open' | 'closed';
	private _content: number;
	private _coord: Coord;

	public constructor(coord: Coord, assign?: CellInterface) {
		if (assign) {
			this._bomb = assign.bomb;
			this._state = assign.state;
			this._coord = assign.coord;
			this._content = assign.content;
		} else {
			this._bomb = false;
			this._state = 'closed';
			this._coord = coord;
			this._content = 0;
		}
	}

	public get bomb() {
		return this._bomb;
	}

	public get state() {
		return this._state;
	}

	public get content() {
		return this._content;
	}

	public get coord() {
		return this._coord;
	}

	public MakeBomb() {
		this._bomb = true;
		this._content = -1;
	}

	public Open() {
		this._state = 'open';
	}

	public Increment() {
		if (!this._bomb) {
			this._content += 1;
		}
	}

	public GetData(): CellInterface {
		return {
			bomb: this._bomb,
			state: this._state,
			coord: this._coord,
			content: this._content,
		};
	}
}
