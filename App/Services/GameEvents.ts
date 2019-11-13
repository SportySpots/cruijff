import { TypedEvent } from "App/Utils/TypedEvent";

export const GameCreatedEvent = new TypedEvent<{uuid: string}>();
export const GameUpdatedEvent = new TypedEvent<{uuid: string}>();
