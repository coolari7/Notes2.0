import { App } from "./app";
import { HealthCheckController } from "./controllers/health-check/health-check.controller";

const app = new App([new HealthCheckController()]);

app.listen();
