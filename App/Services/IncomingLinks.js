import EventEmitter from 'events';
import { Linking } from 'react-native';

export const Events = {
  SOCIAL_LOGIN_NOT_REGISTERED: 'SOCIAL_LOGIN_NOT_REGISTERED',
  LOGIN_TOKEN: 'LOGIN_TOKEN',
  MAGIC_LINK_LOGIN: 'MAGIC_LINK_LOGIN',
};

export const IncomingLinks = new EventEmitter();

Linking.addEventListener('url', async ({ url }) => {
  if (url.search('social_login_not_registered') !== -1) {
    IncomingLinks.emit(Events.SOCIAL_LOGIN_NOT_REGISTERED);
  } else if (url.search('magic_link_login')) {
    const splitURL = url.split('login?token=');
    const token = splitURL[1];
    if (token) {
      IncomingLinks.emit(Events.MAGIC_LINK_LOGIN, token);
    }
  } else {
    const splitURL = url.split('login?token=');
    const token = splitURL[1];
    if (token) {
      IncomingLinks.emit(Events.LOGIN_TOKEN, token);
    }
  }
});
