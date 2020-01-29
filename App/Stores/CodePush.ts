import moment from 'moment';
import codePush, { LocalPackage } from 'react-native-code-push';
import firebase from 'react-native-firebase';
import I18n from '../I18n';
import { observable } from "mobx";

export enum UPDATE_STATUS {
  UP_TO_DATE= 'UP_TO_DATE',
  CHECKING= 'CHECKING',
  AVAILABLE= 'AVAILABLE',
  DOWNLOADING= 'DOWNLOADING',
  RESTART_REQUIRED= 'RESTART_REQUIRED',
}

// check every CHECK_FREQUENCY seconds for updates
const CHECK_FREQUENCY = 3600 * 6

export class CodePushStore {
  @observable updateStatus: UPDATE_STATUS = UPDATE_STATUS.UP_TO_DATE
  @observable downloadProgress = 1
  @observable current: LocalPackage|null = null
  @observable lastChecked: moment.Moment = moment.utc()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private interval: any = null

  async start() {
    this.checkForUpdates()
    // this.startInterval()
    this.current = await codePush.getUpdateMetadata()
  }

  showUpdateNotification() {
    const localNotification = new firebase.notifications.Notification()
      .setSound('default')
      .setNotificationId('update')
      .setTitle(I18n.t('codePush.notificationTitle'))
      // .setSubtitle('cc')
      .setBody(I18n.t('codePush.notificationBody'))
      .android.setChannelId('notifications') // e.g. the id you chose above
      .android.setSmallIcon('@drawable/notification_icon') // create this icon in Android Studio
      .android.setColor('#00ff00') // you can set a color here
      .android.setPriority(firebase.notifications.Android.Priority.High)

    firebase.notifications().displayNotification(localNotification)
  }

  async checkForUpdates() {
    console.log('codepush: checking for updates');
    this.updateStatus = UPDATE_STATUS.CHECKING;
    const remotePackage = await codePush.checkForUpdate();
    if (!remotePackage) {
      console.log('codepush: no remote package');
      this.updateStatus = UPDATE_STATUS.UP_TO_DATE;
    } else {
      // stop checking for updates while downloading
      this.stopInterval();
      console.log('codepush: found update:', remotePackage);
      this.updateStatus = UPDATE_STATUS.DOWNLOADING
      const newPackage = await remotePackage.download((progress) => {
        this.downloadProgress = progress.receivedBytes / progress.totalBytes
      });
      this.downloadProgress = 1;
      console.log('codepush: download complete');
      await newPackage.install(codePush.InstallMode.ON_NEXT_RESTART);
      this.updateStatus = UPDATE_STATUS.RESTART_REQUIRED
      this.showUpdateNotification();
      console.log('codepush: Update installed. Needs restart.');
    }
    this.lastChecked = moment.utc();
  }

  startInterval() {
    this.interval = setInterval(this.checkForUpdates.bind(this), CHECK_FREQUENCY * 1000);
  }

  stopInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
const store = new CodePushStore();
export default store;
