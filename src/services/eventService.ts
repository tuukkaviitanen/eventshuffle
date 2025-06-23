import { InvalidParameterError, NotFoundError, UnexpectedError } from "../errors";
import prisma from "../prisma";

/**
 * Returns the date portion of the ISO DateTime string
 */
const getISODateString = (date: Date) => date.toISOString().substring(0, 10);

type CreateEventParams = {
  name: string;
  dates: Date[];
};

const createEvent = async ({ name, dates }: CreateEventParams) => {
  const event = await prisma.event.create({
    data: {
      name: name,
      dates: {
        createMany: {
          data: dates.map((date) => ({ date })),
        },
      },
    },
    select: { id: true },
  });

  return event;
};

const getEvents = async () => {
  const events = await prisma.event.findMany({
    select: { id: true, name: true },
  });

  return events;
};

type AddVotesParams = { eventId: string; name: string; votes: Date[] };

const addVotes = async ({ eventId, name, votes }: AddVotesParams) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { dates: true },
  });

  if (!event) {
    throw new NotFoundError("Event not found");
  }

  const eventDateVotes = [];

  for (const vote of votes) {
    const matchingDate = event.dates.find(
      (date) => date.date.getTime() === vote.getTime()
    );

    if (!matchingDate) {
      throw new InvalidParameterError(
        `${getISODateString(vote)} is not an option for ${event.name}`
      );
    }

    eventDateVotes.push({ name, eventDateId: matchingDate.id });
  }

  await prisma.eventDateVote.createMany({ data: eventDateVotes });

  const fullEvent = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      dates: {
        select: { date: true, votes: { select: { name: true } }  },
      },
    },
  });

  if(!fullEvent) {
    throw new UnexpectedError("Event was unexpectedly removed from the database")
  }

  const mappedEvent = { id: fullEvent.id, name: fullEvent.name, dates: fullEvent.dates.map((date) => getISODateString(date.date)), votes: fullEvent.dates.filter(date => date.votes.length).map((date => ({date: getISODateString(date.date), people: date.votes.map(vote => vote.name)}))) };

  return mappedEvent;
};

export default { createEvent, getEvents, addVotes };
