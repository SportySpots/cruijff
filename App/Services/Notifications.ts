import firebase from 'react-native-firebase';

export class NotificationsManager {
  private notificationOpenedListener: (() => any) | null = null;
  private notificationDisplayedListener: (() => any) | null = null;
  private notificationListener: (() => any) | null = null;

  constructor() {
    this.init();
  }

  async init() {
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
}
