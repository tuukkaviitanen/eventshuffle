import Elysia, { t } from "elysia";
import eventService from "../services/eventService";

const eventRoutes = new Elysia({ prefix: "/event" })
  .get("/list", async () => {
    return {events: await eventService.getEvents()}
  })
  .post(
    "/",
    ({ body: {name, dates} }) => eventService.createEvent({name, dates: dates.map(date => new Date(date))}),
    {
      body: t.Object({
        name: t.String(),
        dates: t.Array(t.String({ format: "date" })),
      }),
    },
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
    },
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
    },
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
    },
  );

export default eventRoutes;
