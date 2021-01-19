import Logger, {
  createLogger,
  LoggerOptions,
  Stream,
  stdSerializers,
} from "bunyan";
import { existsSync, mkdirSync } from "fs";
import { LogPaths, DEFAULT_LOGGER_NAME } from "..";
import { reqSerializer, resSerializer } from "./serializers";

class LoggerFactory {
  protected readonly logger: Logger;

  constructor() {
    // Create ./logs if it doesn't exist
    if (!existsSync("logs")) {
      mkdirSync("logs");
    }

    const streams: Stream[] = [
      {
        level: "trace",
        stream: process.stdout,
      },
    ];
    LogPaths.forEach(({ level, path }) => {
      streams.push({ level, path });
    });

    const options: LoggerOptions = {
      name: DEFAULT_LOGGER_NAME,
      level: "trace",
      streams,
      serializers: {
        req: reqSerializer,
        res: resSerializer,
        err: stdSerializers.err,
      },
    };

    this.logger = createLogger(options);
  }

  public getNamedLogger(source: string): Logger {
    return this.logger.child({ source });
  }
}

// eslint-disable-next-line import/prefer-default-export
export const loggerFactory = new LoggerFactory();
