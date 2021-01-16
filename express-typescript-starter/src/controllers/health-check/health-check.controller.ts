import express, { Router, Request, Response } from "express";
import { BaseController } from "../index";

// eslint-disable-next-line import/prefer-default-export
export class HealthCheckController implements BaseController {
  public router: Router = express.Router();
  public path: string = "/";

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", HealthCheckController.getHealthCheck);
  }

  private static getHealthCheck(_req: Request, res: Response): void {
    res.status(200).send("GET / is working.");
  }
}
