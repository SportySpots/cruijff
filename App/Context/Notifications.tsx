import React from 'react';
import firebase from 'react-native-firebase';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------

interface IState {
}

interface IProps extends IState {
}

// The defaultValue argument is ONLY used when a component does not have a matching
// Provider above it in the tree. This can be helpful for testing components in isolation
// without wrapping them. Note: passing undefined as a Provider value does not cause
// consuming components to use defaultValue.
const defaultValue: IProps = {
};

export const NotificationsContext = React.createContext(defaultValue);

export class NotificationsProvider extends React.Component<{children: any}, IState> {
  state: IState = {
  };

  private notificationOpenedListener: (() => any) | null = null;
  private notificationDisplayedListener: (() => any) | null = null;
  private notificationListener: (() => any) | null = null;

  async componentWillMount() {
    // create android notification channel to display notifications while app in foreground
    const channel = new firebase.notifications.Android
      .Channel('notifications', 'Notification Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('Notifications');
    firebase.notifications().android.createChannel(channel);

    firebase.messaging().hasPermission().then((result) => {
      console.log('has notification permission', result);
      if (!result) {
        firebase.messaging().requestPermission();
      }
    });

    // notification opened with app in foreground/background
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened(
      (notificationOpen) => {
        console.log('notificationOpened', notificationOpen);
      },
    );

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed(
      (notification) => {
        console.log('notificationDisplayed', notification);
      },
    );

    // notification received while app in foreground
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log('notificationReceived', notification);
      // display the notification in system tray. Does not happen by default if app in foreground
      notification.android.setChannelId('notifications');
      notification.android.setSmallIcon('@drawable/notification_icon');
      notification.android.setColor('#00ff00');

      firebase.notifications().displayNotification(notification);
    });

    firebase.notifications().getInitialNotification().then((notification) => {
      if (notification) {
        // app was opened while closed by clicking a notification
        console.log('initialNotification', notification);
      }
    });
  }

  render() {
    const { children } = this.props;
    const providerValue = {
      ...this.state,
    };

    return (
      <NotificationsContext.Provider
        value={providerValue}
      >
        {children}
      </NotificationsContext.Provider>
    );
  }
}

export const NotificationsConsumer = NotificationsContext.Consumer;

export const withNotifications = <P extends object>(Component: React.ComponentType<IProps & P>) =>
  React.forwardRef((props: P, ref) => (
    <NotificationsConsumer>
      {(locationProps: IProps) => <Component ref={ref} {...props} {...locationProps} />}
    </NotificationsConsumer>
  ));
