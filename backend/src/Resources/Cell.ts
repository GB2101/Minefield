export class Cell {
	private _bomb: boolean;
	private _state: 'open' | 'closed';
	private _content: number;

	public constructor() {
		this._bomb = false;
		this._state = 'closed';
		this._content = 0;
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
}
