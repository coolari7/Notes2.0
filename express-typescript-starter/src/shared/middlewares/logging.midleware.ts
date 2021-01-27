/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from "express";
import { loggerFactory } from "..";

const logger = loggerFactory.getNamedLogger("Request");

export function loggingMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  logger.info({ req });
  next();
}
