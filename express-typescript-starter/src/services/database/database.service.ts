import { connect, Connection, connection, ConnectionOptions } from "mongoose";

export default class DatabaseService {
  private dbOptions: ConnectionOptions;
  private dbConnection: Connection;

  constructor() {
    this.dbConnection = connection;
    this.dbOptions = {
      dbName: "test",
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    };
    this.registerDatabaseEvents();
  }

  public async connectToDatabase(): Promise<void> {
    const { MONGO_USER, MONGO_PASS, MONGO_HOST } = process.env;

    await connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}`,
      this.dbOptions
    ).catch(DatabaseService.onInitialError);
  }

  private registerDatabaseEvents(): void {
    this.dbConnection.on("connecting", DatabaseService.onConnecting);
    this.dbConnection.on("open", DatabaseService.onOpen);
    this.dbConnection.on("error", DatabaseService.onError);
  }

  private static onOpen(): void {
    console.log("Connected!");
  }

  private static onConnecting(): void {
    console.log("Connecting to database...");
  }

  private static onError(err: Error): void {
    console.log("An Error has occured!");
    console.log(err.message);
  }

  private static onInitialError(err: Error): void {
    console.log("Failed to establish Connection!");
    console.log(err.message);
    console.log("Exiting...");
    process.exit(0);
  }
}
