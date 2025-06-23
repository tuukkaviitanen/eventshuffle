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
    ({ params: { eventId } }) => eventService.getSingleEvent(eventId),
    {
      params: t.Object({
        eventId: t.String({format: "uuid"}),
      }),
    },
  )
  .post(
    "/:eventId/vote",
    ({ params: { eventId }, body: {name, votes} }) => eventService.addVotes({eventId, name, votes: votes.map((vote) => new Date(vote))}),
    {
      params: t.Object({
        eventId: t.String({format: "uuid"}),
      }),
      body: t.Object({
        name: t.String(),
        votes: t.Array(t.String({format: "date"})),
      }),
    },
  )
  .get(
    "/:eventId/results",
    ({ params: { eventId } }) => eventService.getResult(eventId),
    {
      params: t.Object({
        eventId: t.String({format:"uuid"}),
      }),
    },
  );

export default eventRoutes;
