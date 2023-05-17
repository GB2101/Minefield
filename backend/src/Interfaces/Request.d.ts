import { Request, Response } from 'firebase-functions/v1';

type Handler = (req: Request, res: Response) => void;
type AsyncHandler = (req: Request, res: Response) => Promise<void>;

export type { Handler, AsyncHandler };
