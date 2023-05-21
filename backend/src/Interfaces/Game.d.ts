type Data = Record<string, unknown>;

interface Coord {
	x: number;
	y: number;
}

interface CellInterface {
	bomb: boolean;
	state: 'open' | 'closed';
	content: number;
	coord: Coord;
}

// interface BoardInterface {
// 	items: Cell[];
// }

interface MoveInterface {
	bomb: boolean;
	content: number;
	coord: Coord;
}

type Status = 'Won' | 'Playing' | 'Lost';

interface Movement {
	coord: Coord;
	status: Status;
	flags?: Coord[];
	open_cells: MoveInterface[];
}

// eslint-disable-next-line
type GameInterface = {
	width: number;
	bombs: number;
	height: number;
	status: Status;
	locations: Coord[];
	board: CellInterface[];
	movements: Movement[];
};

export type { Data, Coord, GameInterface, CellInterface, MoveInterface, Movement, Status };
