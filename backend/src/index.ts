import { Hono } from "hono";
import auth from "./routes/auth";

const app = new Hono();

const routes = [auth] as const;

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

app.get("/", (c) => c.text("Hello from the backend!"));

export default app;
