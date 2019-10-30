import EventEmitter from 'events';
import firebase from 'react-native-firebase';

export enum Events {
  SOCIAL_LOGIN_NOT_REGISTERED = 'SOCIAL_LOGIN_NOT_REGISTERED',
  LOGIN_TOKEN = 'LOGIN_TOKEN',
  MAGIC_LINK_LOGIN = 'MAGIC_LINK_LOGIN',
  GAME_OPENED = 'GAME_OPENED',
}

export interface IEvent {
  type: keyof typeof Events;
  args: any[];
}

class CustomEmitter extends EventEmitter {
  emitEvent = (event: IEvent) => {
    this.emit(event.type, ...event.args);
  }
}

export const IncomingLinks = new CustomEmitter();

type IURLParser = (url: string) => IEvent | null;

const urlParsers: IURLParser[] = [];

// Social login parser
urlParsers.push((url) => {
  if (url.search('social_login_not_registered') !== -1) {
    return {
      type: Events.SOCIAL_LOGIN_NOT_REGISTERED,
      args: [],
    };
  } else {
    return null;
  }
});

// Magic link login parser
urlParsers.push((url) => {
  if (url.search('magic_link_login') !== -1) {
    const splitURL = url.split('login?token=');
    const token = splitURL[1];
    if (token) {
      return {
        type: Events.MAGIC_LINK_LOGIN,
        args: [token],
      };
    }
    throw new Error('Magic login link received without token.');
  }
  return null;
});

// Login with token parser (result step of OAuth login)
urlParsers.push((url) => {
  const splitURL = url.split('login?token=');
  const token = splitURL[1];
  if (splitURL.length === 2) {
    if (token) {
      return {
        type: Events.LOGIN_TOKEN,
        args: [token],
      };
    }
    throw new Error('Login url received without token.');
  }
  return null;
});

// Game link parser
urlParsers.push((url) => {
  if (url.search('games/') !== -1) {
    const splitURL = url.split('games/');
    const uuid = splitURL[1];
    if (uuid) {
      return {
        type: Events.GAME_OPENED,
        args: [uuid],
      };
    }
    throw new Error('Game link received without game UUID.');
  }
  return null;
});

export const urlToEvent = (url) => {
  for (const parser of urlParsers) {
    const parserResult = parser(url);
    if (parserResult) {
      return parserResult;
    }
  }
  return null;
};

firebase.links().onLink((url) => {
  console.log('link received', url);
  const event = urlToEvent(url);
  if (event) {
    IncomingLinks.emitEvent(event);
  }
});

export const getInitialEvent = async () => {
  const initialURL = await firebase.links().getInitialLink();
  if (initialURL) {
    return urlToEvent(initialURL); // could be null
  }
  return null;
};
