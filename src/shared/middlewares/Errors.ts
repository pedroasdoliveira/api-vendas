import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

const Errors = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 'Error', message: error.message });
  }

  return res.status(500).json({status: 'Error', message: "Internal server error!"})
}

export default Errors;