/* eslint-disable import/prefer-default-export */
import { Response } from "express";

export function resSerializer(res: Response) {
  if (!res || !res.statusCode) {
    return res;
  }
  const { statusCode, statusMessage } = res;
  return {
    statusCode,
    statusMessage,
  };
}
