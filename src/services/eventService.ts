import prisma from "../prisma";

/**
 * Returns the date portion of the ISO DateTime string
 */ 
const getISODateString = (date: Date)  =>  date.toISOString().substring(0, 10);

type CreateEvent = {
  name: string;
  dates: Date[];
};

const createEvent = async (createEvent: CreateEvent) => {
  const event = await prisma.event.create({
    data: {
      name: createEvent.name,
      dates: {
        createMany: {
          data: createEvent.dates.map((date) => ({ date })),
        },
      },
    },
    include: { dates: { select: { date: true } } },
  });

  const mappedEvent = { ...event, dates: event.dates.map((date) => getISODateString(date.date)) };

  return mappedEvent;
};

const getEvents = async () => {
    const events = await prisma.event.findMany({select:{id: true, name: true}})

    return events;
}

export default { createEvent, getEvents };
