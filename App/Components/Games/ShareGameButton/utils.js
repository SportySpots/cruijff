import { Share } from 'react-native';
import config from '../../../config';
import I18n from '../../../I18n';

const handleShare = (gameUUID) => {
  const url = `https://${config.deeplinkHost}/games/${gameUUID}`;
  const message = `${I18n.t('You have been invited to a SportySpots game:')} ${url}`;
  Share.share(
    { message, title: 'SportySpots' },
    { dialogTitle: I18n.t('share') },
  );
};

export default handleShare;