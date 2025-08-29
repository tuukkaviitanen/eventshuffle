import Elysia, { t } from "elysia";
import eventService from "../services/eventService";

const eventRoutes = new Elysia({ prefix: "/event" })
  .get(
    "/list",
    async () => {
      return { events: await eventService.getEvents() };
    },
    {
      response: t.Object({
        events: t.Array(
          t.Object({
            id: t.String({ format: "uuid" }),
            name: t.String(),
          })
        ),
      }),
      tags: ["Events"],
    }
  )
  .post(
    "/",
    ({ body: { name, dates } }) =>
      eventService.createEvent({
        name,
        dates: dates.map((date) => new Date(date)),
      }),
    {
      body: t.Object({
        name: t.String(),
        dates: t.Array(t.String({ format: "date" })),
      }),
      response: t.Object({
        id: t.String({ format: "uuid" }),
      }),
      tags: ["Events"],
    }
  )
  .get(
    "/:eventId",
    ({ params: { eventId } }) => eventService.getSingleEvent(eventId),
    {
      params: t.Object({
        eventId: t.String({ format: "uuid" }),
      }),
      response: t.Object({
        id: t.String({ format: "uuid" }),
        name: t.String(),
        dates: t.Array(t.String({ format: "date" })),
        votes: t.Array(
          t.Object({
            date: t.String({ format: "date" }),
            people: t.Array(t.String()),
          })
        ),
      }),
      tags: ["Events"],
    }
  )
  .post(
    "/:eventId/vote",
    ({ params: { eventId }, body: { name, votes } }) =>
      eventService.addVotes({
        eventId,
        name,
        votes: votes.map((vote) => new Date(vote)),
      }),
    {
      params: t.Object({
        eventId: t.String({ format: "uuid" }),
      }),
      body: t.Object({
        name: t.String(),
        votes: t.Array(t.String({ format: "date" })),
      }),
      response: t.Object({
        id: t.String({ format: "uuid" }),
        name: t.String(),
        dates: t.Array(t.String({ format: "date" })),
        votes: t.Array(
          t.Object({
            date: t.String({ format: "date" }),
            people: t.Array(t.String()),
          })
        ),
      }),
      tags: ["Events"],
    }
  )
  .get(
    "/:eventId/results",
    ({ params: { eventId } }) => eventService.getResult(eventId),
    {
      params: t.Object({
        eventId: t.String({ format: "uuid" }),
      }),
      response: t.Object({
        id: t.String({ format: "uuid" }),
        name: t.String(),
        suitableDates: t.Array(
          t.Object({
            date: t.String({ format: "date" }),
            people: t.Array(t.String()),
          })
        ),
      }),
      tags: ["Events"],
    }
  );

export default eventRoutes;
