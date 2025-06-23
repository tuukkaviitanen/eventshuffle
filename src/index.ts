import { Elysia } from "elysia";
import eventRoutes from "./routes/eventRoutes";
import { InvalidParameterError, NotFoundError } from "./errors";

const app = new Elysia({ prefix: "/api/v1" })
  .onError(({ error, set, code }) => {
    if (error instanceof NotFoundError) {
      set.status = 404;
      return { message: error.message };
    }

    if (error instanceof InvalidParameterError) {
      set.status = 400;
      return { message: error.message };
    }

    if (code !== "VALIDATION") {
      console.error(error);

      set.status = 500;
      return { message: "Internal error occurred" };
    }
  })
  .use(eventRoutes)
  .listen(3000);

console.log(`API is running on port ${app.server?.port}`);
