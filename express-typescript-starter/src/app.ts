import express = require("express");
import { Controller } from "./controllers/controller.interface";

export class App {
  constructor(
    controllers: Controller[],
    public app: express.Application = express()
  ) {
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
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
    this.app.listen(3000, () => {
      console.log(`App is listening on PORT 3000`);
    });
  }
}
