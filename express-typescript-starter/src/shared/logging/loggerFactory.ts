import Logger, {
  createLogger,
  LoggerOptions,
  Stream,
  stdSerializers,
  LogLevelString,
} from "bunyan";
import { existsSync, mkdirSync } from "fs";
import { LogPaths, DEFAULT_LOGGER_NAME } from "..";
import { reqSerializer, resSerializer } from "./serializers";
import deploymentEnv from "../../config/getNodeEnv";

class LoggerFactory {
  protected readonly logger: Logger;
  public readonly logLevel: LogLevelString;

  constructor() {
    // Create ./logs if it doesn't exist
    if (!existsSync("logs")) {
      mkdirSync("logs");
    }

    this.logLevel = LoggerFactory.setLogLevel();
    const streams: Stream[] = [
      {
        level: this.logLevel,
        stream: process.stdout,
      },
    ];
    LogPaths.forEach(({ level, path }) => {
      streams.push({ level, path });
    });

    const options: LoggerOptions = {
      name: DEFAULT_LOGGER_NAME,
      level: this.logLevel,
      streams,
      serializers: {
        req: reqSerializer,
        res: resSerializer,
        err: stdSerializers.err,
      },
    };

    this.logger = createLogger(options);
  }

  private static setLogLevel(): LogLevelString {
    let output: LogLevelString = "trace";
    if (["production"].includes(deploymentEnv)) {
      output = "info";
    }
    return output;
  }

  public getNamedLogger(source: string): Logger {
    return this.logger.child({ source });
  }
}

// eslint-disable-next-line import/prefer-default-export
export const loggerFactory = new LoggerFactory();
