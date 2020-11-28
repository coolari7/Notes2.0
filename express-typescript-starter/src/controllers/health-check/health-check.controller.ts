import express, { Router, Request, Response } from "express";
import { Controller } from "../controller.interface";

export class HealthCheckController implements Controller {
  constructor(
    public router: Router = express.Router(),
    public path: string = "/"
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.getHealthCheck);
  }

  private getHealthCheck(_req: Request, res: Response): void {
    res.status(200).send("GET / is working.");
  }
}
