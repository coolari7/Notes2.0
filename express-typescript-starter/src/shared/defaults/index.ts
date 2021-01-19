/* eslint-disable import/prefer-default-export */
import { LoggerPath } from "..";

export const DEFAULT_LOGGER_NAME = "Node-Typescript-Starter";
export const LogPaths: LoggerPath[] = [
  {
    level: "info",
    path: "./logs/info.log",
  },
  {
    level: "warn",
    path: "./logs/warn.log",
  },
  {
    level: "error",
    path: "./logs/error.log",
  },
  {
    level: "fatal",
    path: "./logs/fatal.log",
  },
];
