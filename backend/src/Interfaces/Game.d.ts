type Data = Record<string, unknown>;

interface Coord {
	x: number;
	y: number;
}

interface CellInterface {
	bomb: boolean;
	state: 'open' | 'closed';
	content: number;
}

interface BoardInterface {
	items: Cell[];
}

// eslint-disable-next-line
type GameInterface = {
	width: number;
	height: number;
	bombs: number;
	board: CellInterface[];
	locations: Coord[];
};

export type { Data, Coord, GameInterface, CellInterface };
