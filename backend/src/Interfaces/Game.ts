interface Coord {
	x: number;
	y: number;
}

interface Cell {
	bomb: boolean;
	state: 'open' | 'closed';
	content: number;
}

interface Board {
	width: number;
	height: number;
	bombs: number;
	board: Cell[][];
	locations: Coord[];
}

export type { Cell, Board, Coord };
