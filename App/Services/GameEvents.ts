import EventEmitter from 'events';

export enum GameEvents {
  GAME_CREATED = 'GAME_CREATED',
  GAME_UPDATED = 'GAME_UPDATED',
}

export interface IEvent {
  type: keyof typeof GameEvents;
  args: any[];
}

class GameEventEmitter extends EventEmitter {
  emitEvent = (event: IEvent) => {
    this.emit(event.type, ...event.args);
  }
}

export const gameEventEmitter = new GameEventEmitter();
