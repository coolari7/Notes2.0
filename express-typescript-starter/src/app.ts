import express, { Application } from "express";
import { Controller } from "./controllers/interface/controller.interface";
import { DatabaseService } from "./services";

export default class App {
  private PORT: number;
  private databaseService: DatabaseService;
  public app: Application;

  constructor(controllers: Controller[]) {
    // Initialize Variables
    this.PORT = App.getPort();
    this.databaseService = new DatabaseService();
    this.app = express();

    // Initialize Functions
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
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

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.app.use("/", controller.router);
    });
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
