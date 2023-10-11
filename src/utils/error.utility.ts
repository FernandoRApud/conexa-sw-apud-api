import { Response } from 'express';

export default class AppError extends Error {
  code: number;

  constructor(message: string, code = 500) {
    super(message);
    this.code = code;
  }
}

export const handleAppError = (res: Response, error: unknown) => {
  if (error instanceof AppError) return res.status(error.code).json({ msg: error.message });
  return res.status(500).json({ msg: 'Internal server error.' });
};
