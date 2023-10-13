import { Response } from 'express';
import { IRequestError } from '../interfaces';

export default class AppError extends Error {
  code: number;

  constructor(message: string, code = 500) {
    super(message);
    this.code = code;
  }
}

const isRequestError = (error: IRequestError | unknown): error is IRequestError => (error as IRequestError).response !== undefined;

export const handleAppError = (res: Response, error: unknown) => {
  if (error instanceof AppError) return res.status(error.code).json({ msg: error.message });
  if (isRequestError(error) && error.response) return res.status(error.response.status).json({ msg: error.response.data.detail });
  return res.status(500).json({ msg: 'Internal server error.' });
};
