/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, computed, observable } from "mobx";

export enum Level {
  DEBUG="DEBUG",
  INFO="INFO",
  WARN="WARN",
  ERROR="ERROR"
}

interface LogEntry {
  level: Level;
  message: string;
  timestamp: number;
  data: any;
}

type Handler = (entry: LogEntry) => void;

const consoleLog = (console && console.log) ? console.log: () => null;
export const consoleLogHandler = (entry: LogEntry) => {
  if (entry.data) {
    consoleLog(`[${entry.level}] ${entry.message}`, entry.data);
  } else {
    consoleLog(`[${entry.level}] ${entry.message}`);
  }
}

export class LogStore {
  readonly entries = observable<LogEntry>([])
  public handlers: Handler[] = [];

  constructor() {
    this.handlers.push(consoleLogHandler);

    // capture console.log & friends
    if (console) {
      const mapper = {
        log: Level.INFO,
        warn: Level.WARN,
        error: Level.ERROR,
      }
      Object.keys(mapper).forEach(consoleLogLevel => {
        console[consoleLogLevel] = (...args: any[]) => {
          if (args.length > 0 && typeof args[0] === 'string') {
            this.log(args[0], mapper[consoleLogLevel], args.length > 1 ? args.slice(1) : null)
          } else {
            this.log('', mapper[consoleLogLevel], args)
          }
        }
      })
    }
  }

  @action log(message: string, level: Level = Level.INFO, data: any = null) {
    if (message.includes("Require cycle")) {
      // ignore stupid require cycle warnings
      return
    }
    const entry: LogEntry = {
      level, message, data, timestamp: new Date().getTime()
    }
    this.entries.push(entry);
    for (const handler of this.handlers) {
      handler(entry);
    }
  }

  @action debug(message: string, data: any = null) {
    this.log(message, Level.DEBUG, data);
  }
  @action info(message: string, data: any = null) {
    this.log(message, Level.INFO, data);
  }
  @action warn(message: string, data: any = null) {
    this.log(message, Level.WARN, data);
  }
  @action error(message: string, data: any = null) {
    this.log(message, Level.ERROR, data);
  }

  @computed get asText() {
    let output = '';
    this.entries.forEach(entry => {
      let dataAsText = ''
      if (entry.data) {
        try {
          dataAsText = JSON.stringify(entry.data)
        } catch {
          dataAsText = '[Data not serializable]'
        }
      }
      output += `${Math.floor(entry.timestamp/1000)} ${entry.level} ${entry.message} ${dataAsText}\n\n`
    })
    return output;
  }
}

const logStore = new LogStore();
export default logStore;

export const log = logStore;
