/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import codePush from 'react-native-code-push';
import firebase from 'react-native-firebase';
import I18n from '../I18n';
import AsyncStorage from '@react-native-community/async-storage';

export const UPDATE_STATUS = {
  UP_TO_DATE: 'UP_TO_DATE',
  CHECKING: 'CHECKING',
  AVAILABLE: 'AVAILABLE',
  DOWNLOADING: 'DOWNLOADING',
  RESTART_REQUIRED: 'RESTART_REQUIRED',
};

// check every CHECK_FREQUENCY seconds for updates
const CHECK_FREQUENCY = 30;

const defaultValue = {
  updateStatus: UPDATE_STATUS.UP_TO_DATE,
  downloadProgress: 1,
  current: null, // metadata of current codePush installed version
  lastChecked: moment.utc(),
  allowDevUpdates: false,
};

export const CodePushContext = React.createContext(defaultValue);

export class CodePushProvider extends React.Component {
  state = { ...defaultValue }

  interval = null;

  // eslint-disable-next-line class-methods-use-this
  showUpdateNotification() {
    const localNotification = new firebase.notifications.Notification({
      sound: 'default',
      show_in_foreground: true,
      // show_in_background: true,
    })
      .setNotificationId('update')
      .setTitle(I18n.t('codePush.notificationTitle'))
      // .setSubtitle('cc')
      .setBody(I18n.t('codePush.notificationBody'))
      .android.setChannelId('notifications') // e.g. the id you chose above
      .android.setSmallIcon('@drawable/notification_icon') // create this icon in Android Studio
      .android.setColor('#00ff00') // you can set a color here
      .android.setPriority(firebase.notifications.Android.Priority.High);

    firebase.notifications().displayNotification(localNotification);
  }

  async checkForUpdates() {
    console.log('CODEPUSH: checking for updates');
    this.setState({ updateStatus: UPDATE_STATUS.CHECKING });
    const remotePackage = await codePush.checkForUpdate();
    if (!remotePackage) {
      this.setState({ updateStatus: UPDATE_STATUS.UP_TO_DATE });
    } else {
      // stop checking for updates while downloading
      this.stopInterval();
      console.log('codepush found update:', remotePackage);
      this.setState({ updateStatus: UPDATE_STATUS.DOWNLOADING });
      const newPackage = await remotePackage.download((progress) => {
        this.setState({ downloadProgress: progress.receivedBytes / progress.totalBytes });
      });
      this.setState({ downloadProgress: 1 });
      await newPackage.install(codePush.InstallMode.ON_NEXT_RESTART);
      this.setState({ updateStatus: UPDATE_STATUS.RESTART_REQUIRED });
      this.showUpdateNotification();
      console.log('CODEPUSH: Update installed. Needs restart.');
    }
    this.setState({ lastChecked: moment.utc() });
  }

  startInterval() {
    this.interval = setInterval(this.checkForUpdates.bind(this), CHECK_FREQUENCY * 1000);
  }

  stopInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }

  setAllowDevUpdates = (enabled = false) => {
    this.setState({ allowDevUpdates: enabled });
    if (enabled) {
      AsyncStorage.setItem('AsyncStorageAllowDevUpdates', 'true');
    } else {
      AsyncStorage.removeItem('AsyncStorageAllowDevUpdates');
    }
  }

  async componentDidMount() {
    this.checkForUpdates();
    this.startInterval();
    this.setState({ current: await codePush.getUpdateMetadata() });
    const as = await AsyncStorage.getItem('AsyncStorageAllowDevUpdates');
    if (as) {
      this.setState({ allowDevUpdates: true });
    }
  }

  componentWillUnmount() {
    this.stopInterval();
  }

  render() {
    const { children } = this.props;

    return (
      <CodePushContext.Provider
        value={{
          ...this.state,
          setAllowDevUpdates: this.setAllowDevUpdates,
        }}
      >
        {children}
      </CodePushContext.Provider>
    );
  }
}

CodePushProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const CodePushConsumer = CodePushContext.Consumer;

export const withCodePush = Component => props => (
  <CodePushConsumer>
    {userProps => <Component {...props} {...userProps} />}
  </CodePushConsumer>
);

export const codePushPropTypes = {
  updateStatus: PropTypes.oneOf(Object.values(UPDATE_STATUS)),
  downloadProgress: PropTypes.number,
  lastChecked: PropTypes.instanceOf(moment),
  current: PropTypes.any,
  allowDevUpdates: PropTypes.any,
};
