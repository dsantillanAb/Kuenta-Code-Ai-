export * as PublicEventManifest from "./public-event-manifest"

import { Event } from "@kuenta-devs/schema/event"
import { EventManifest } from "@kuenta-devs/schema/event-manifest"

export const Definitions = EventManifest.ServerDefinitions
export const Latest = Event.latest(Definitions)
