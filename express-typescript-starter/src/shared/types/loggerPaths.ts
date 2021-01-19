import { LogLevelString } from "bunyan";

export interface LoggerPath {
  level: LogLevelString;
  path: string;
}
