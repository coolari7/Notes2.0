/* eslint-disable import/prefer-default-export */
import { Request } from "express";
import { isEmptyObject } from "../..";

export function reqSerializer(req: Request) {
  if (!req || !req.connection) {
    return req;
  }
  const { url, method, headers, params, query, body } = req;
  return {
    url,
    method,
    headers,
    ...(isEmptyObject(params) && { params }),
    ...(isEmptyObject(query) && { query }),
    ...(isEmptyObject(body) && { body }),
  };
}
