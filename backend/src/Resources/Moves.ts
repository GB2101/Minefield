import { Board } from './index';
import { Contains } from '@Utils/Array';
import { ValidationError } from '@Errors/index';
import { MoveInterface, Movement, Coord, Status } from '@Interfaces/Game';

export class Move {
	public readonly board: Board;
	public readonly move: Coord;
	public readonly flags: Coord[];
	public readonly opened: MoveInterface[];
	public status: Status;

	public constructor(board: Board, move: Coord, flags?: Coord[]) {
		this.status = 'Playing';
		this.board = board;
		this.move = move;
		this.flags = flags ?? [];
		this.opened = [];

		if (board.Outside(move)) {
			const message = `The coord is out of bounds, the board is ${board.Width}x${board.Height}`;
			throw new ValidationError('OutOfBounds', 'moving_outside_range', 400, message);
		}

		this.OpenCells(move);
	}

	public SetWon(won: boolean) {
		if (won) this.status = 'Won';
	}

	public GetMovement(): Movement {
		return {
			coord: this.move,
			status: this.status,
			open_cells: this.opened,
			flags: this.flags,
		};
	}

	public OpenCells(coord: Coord): Status {
		const cell = this.board.GetCell(coord);

		if (cell.state === 'closed') {
			cell.Open();
			this.opened.push({ bomb: cell.bomb, content: cell.content, coord });

			if (cell.bomb) {
				this.status = 'Lost';
			}

			if (cell.content === 0) {
				this.board.UpdateCells(coord, update => {
					if (this.board.GetCell(update).state === 'open') {
						return;
					}

					this.status = this.OpenCells(update);
				});
			}
		} else {
			this.board.UpdateCells(coord, update => {
				if (Contains(update, this.flags)) {
					return;
				}

				if (this.board.GetCell(update).state === 'open') {
					return;
				}

				this.status = this.OpenCells(update);
			});
		}

		return this.status;
	}
}
