import { apiCheck } from "./api-check";
import { authCheck } from "./auth-check";
const methodOverride = require("method-override");

export function connectStaticMiddlewares(app): void {
  app.use(methodOverride());
  app.use(apiCheck);
  !(process.env.DEV_MODE === "true") ? app.use(authCheck) : null;
}
