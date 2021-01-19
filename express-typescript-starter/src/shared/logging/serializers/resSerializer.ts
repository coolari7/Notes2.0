/* eslint-disable import/prefer-default-export */
import { Response } from "express";

export function resSerializer(res: Response) {
  const { statusCode, statusMessage } = res;
  return {
    statusCode,
    statusMessage,
  };
}
