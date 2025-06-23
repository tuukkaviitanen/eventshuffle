import Elysia, { t } from "elysia";

const eventRoutes = new Elysia({ prefix: "/event" })
  .get("/list", () => {
    return [];
  })
  .post(
    "/",
    ({ body }) => {
      return { body };
    },
    {
      body: t.Object({
        name: t.String(),
        dates: t.Array(t.String({ format: "date" })),
      }),
    }
  )
  .get(
    "/:eventId",
    ({ params: { eventId } }) => {
      return { eventId };
    },
    {
      params: t.Object({
        eventId: t.Integer(),
      }),
    }
  )
  .post(
    "/:eventId/vote",
    ({ params: { eventId }, body }) => {
      return { eventId, body };
    },
    {
      params: t.Object({
        eventId: t.Integer(),
      }),
      body: t.Object({
        name: t.String(),
        votes: t.Array(t.Date()),
      }),
    }
  )
  .get(
    "/:eventId/results",
    ({ params: { eventId } }) => {
      return { eventId };
    },
    {
      params: t.Object({
        eventId: t.Integer(),
      }),
    }
  );

export default eventRoutes;
