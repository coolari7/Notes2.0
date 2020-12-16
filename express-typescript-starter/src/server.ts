import App from "./app";
import { HealthCheckController, UserController } from "./controllers";

const app = new App([new HealthCheckController(), new UserController()]);

app.listen();
