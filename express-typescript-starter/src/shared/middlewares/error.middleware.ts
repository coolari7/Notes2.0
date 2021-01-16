import { Request, Response, NextFunction } from "express";
import { HttpException } from "..";

// eslint-disable-next-line import/prefer-default-export
export function errorMiddleware(
  err: HttpException,
  _req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).send({
    status,
    message,
  });
}
