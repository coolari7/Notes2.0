/* eslint-disable import/prefer-default-export */
import { Response } from "express";

export function resSerializer(res: Response) {
  if (!res || !res.statusCode) {
    return res;
  }
  const { statusCode, statusMessage } = res;
  const headers = res.getHeaders();
  return {
    statusCode,
    statusMessage,
    headers,
  };
}
