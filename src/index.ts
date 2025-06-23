import { Elysia } from "elysia";
import eventRoutes from "./routes/eventRoutes";
import { InvalidParameterError, NotFoundError } from "./errors";
import swagger from "@elysiajs/swagger";

const api = new Elysia({ prefix: "/api/v1" })
  .onError(({ error, set, code }) => {
    if (error instanceof NotFoundError) {
      set.status = 404;
      return { message: error.message };
    }

    if (error instanceof InvalidParameterError) {
      set.status = 400;
      return { message: error.message };
    }

    if (code === "INTERNAL_SERVER_ERROR") {
      console.error(error);

      set.status = 500;
      return { message: "Internal error occurred" };
    }
  })
  .use(eventRoutes);

const app = new Elysia()
  .use(
    swagger({
      provider: "swagger-ui",
      path: "/",
      specPath: "/openapi",
      documentation: {
        info: {
          title: "Eventshuffle",
          license: { name: "MIT" },
          version: "",
          description: "For scheduling events with friends",
        },
      },
    }),
  )
  .use(api)
  .listen(3000);

console.log(`API is running on port ${app.server?.port}`);
