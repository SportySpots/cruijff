import firebase from 'react-native-firebase';
import { TypedEvent } from "App/Utils/TypedEvent";

export const SocialLoginNotRegisteredEvent = new TypedEvent<void>();
export const MagicLinkLoginEvent = new TypedEvent<{ token: string }>();
export const GameLinkOpenedEvent = new TypedEvent<{ uuid: string }>();

export const urlToEvent = (url) => {
  if (typeof url !== 'string') {
    return;
  }
  if (url.search('social_login_not_registered') !== -1) {
    return SocialLoginNotRegisteredEvent.emit();
  }
  if (url.search('magic_link_login') !== -1) {
    const splitURL = url.split('login?token=');
    const token = splitURL[1];
    if (token) {
      return MagicLinkLoginEvent.emit({ token })
    }
    throw new Error('Magic login link received without token.');
  }
  if (url.search('games/') !== -1) {
    const splitURL = url.split('games/');
    const uuid = splitURL[1];
    if (uuid) {
      return GameLinkOpenedEvent.emit({uuid});
    }
    throw new Error('Game link received without game UUID.');
  }
}

firebase.links().onLink(url => {
  console.log('link received: ', url);
  urlToEvent(url)
});

export const emitInitialLinkEvent = () => firebase.links().getInitialLink().then(url => {
  console.log('initial link: ', url);
  urlToEvent(url);
});
