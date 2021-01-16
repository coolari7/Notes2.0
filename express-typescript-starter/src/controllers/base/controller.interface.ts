import { Router } from "express";

export interface BaseController {
  path: string;
  router: Router;
}
