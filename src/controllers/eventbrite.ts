import * as rp from "request-promise";
const EVENTBRITEAPI_URL = "https://www.eventbriteapi.com/v3";
const TOKEN = "LEJRQSQVIQNZ7Q4BM67C";

export interface EventbriteEvent {
  summary: string;
  name: string;
  url: string;
  venue: string;
  description: string;
  start: string;
  end: string;
}

class EventbriteController {
  constructor(private token: string) { }

  async fetchEvents(): Promise<Array<EventbriteEvent>> {
    const tamuhackEventsUrl = `${EVENTBRITEAPI_URL}/users/me/events/?time_filter=all&token=${this.token}`;
    const response = await rp.get(tamuhackEventsUrl);
    const parsedEvents = JSON.parse(response).events;
    let allEvents: Array<EventbriteEvent> = [];
    for (const event of parsedEvents) {
      allEvents.push(await this.fetchEventData(event.id));
    }

    allEvents = allEvents.sort((first, second) => {
      const firstStartTimeMillis = Date.parse(first.start);
      const secondStartTimeMillis = Date.parse(second.start);
      return firstStartTimeMillis - secondStartTimeMillis;
    });
    return allEvents.map((event) => {
      event.start = new Date(event.start).toLocaleString("en-US", { timeZone: "America/Chicago" });
      event.end = new Date(event.end).toLocaleString("en-US", { timeZone: "America/Chicago" });
      return event;
    })
  }

  private async fetchEventData(eventId: string): Promise<EventbriteEvent> {
    const individualEventUrl = `${EVENTBRITEAPI_URL}/events/${eventId}/?token=${
      this.token
      }`;
    const individualEventResponse = await rp.get(individualEventUrl);
    const individualEventData = JSON.parse(individualEventResponse);
    const {
      name: { text: name },
      description: { text: description },
      url,
      summary,
      venue_id: venueId,
      start: startDatetimeData, end: endDatetimeData
    } = individualEventData;
    const venue = await this.fetchEventVenueData(venueId);
    return {
      name,
      description,
      url,
      summary,
      venue,
      start: startDatetimeData.local,
      end: endDatetimeData.local
    };
  }
  private async fetchEventVenueData(venueId: string): Promise<string> {
    const individualEventVenueUrl = `${EVENTBRITEAPI_URL}/venues/${venueId}/?token=${this.token}`;
    const individualEventVenueResponse = await rp.get(individualEventVenueUrl);
    const individualEventVenueData = JSON.parse(individualEventVenueResponse);
    return individualEventVenueData.name as string;
  }
}

const eventbriteController = new EventbriteController(TOKEN);

export { eventbriteController };
