import { Elysia } from "elysia";
import eventRoutes from "./routes/eventRoutes";

const app = new Elysia({ prefix: "/api/v1" })
  .use(eventRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at port ${app.server?.port}`
);
