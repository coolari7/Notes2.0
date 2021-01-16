import express, { Application } from "express";
import { BaseController } from "./controllers";
import { DatabaseService } from "./services";
import { errorMiddleware } from "./shared";

export default class App {
  private PORT: number;
  private databaseService: DatabaseService;
  public app: Application;

  constructor(controllers: BaseController[]) {
    // Initialize Variables
    this.PORT = App.getPort();
    this.databaseService = new DatabaseService();
    this.app = express();

    // Initialize Functions
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private static getPort(): number {
    const { PORT } = process.env;
    return !!PORT && /^[0-9]{3,5}$/.test(PORT) ? +PORT : 3000;
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json({ limit: "10kb" }));
    this.app.use(
      express.urlencoded({ extended: true, limit: "10kb", parameterLimit: 5 })
    );
  }

  private initializeControllers(controllers: BaseController[]): void {
    controllers.forEach((controller: BaseController) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  public listen(): void {
    this.databaseService
      .connectToDatabase()
      .then(() => {
        this.app.listen(this.PORT, () => {
          console.log(`App is listening on PORT ${this.PORT}`);
        });
      })
      .catch((err: Error) => {
        console.log("Failed to connect to database");
        console.log(err.message);
      });
  }
}
