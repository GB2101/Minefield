import { Request, Response, NextFunction } from 'express';

type Handler = (req: Request, res: Response) => void;
type AsyncHandler = (req: Request, res: Response) => Promise<void>;

type Middleware = () => (req: Request, res: Response, next: NextFunction) => void;
type AsyncMiddleware = () => (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type { Handler, AsyncHandler, Middleware, AsyncMiddleware };
