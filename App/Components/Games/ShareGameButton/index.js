import React from 'react';
import PropTypes from 'prop-types';
import { Share } from 'react-native';
import config from '../../../config';
import I18n from '../../../I18n';
import RoundButton from '../../Common/RoundButton';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ShareGameButton extends React.PureComponent {
  handleShare = () => {
    const { gameUUID } = this.props;

    const url = `https://${config.deeplinkHost}/games/${gameUUID}`;
    const message = `${I18n.t('You have been invited to a SportySpots game:')} ${url}`;

    Share.share(
      { message, title: 'SportySpots' },
      { dialogTitle: I18n.t('share') },
    );
  }

  render() {
    return (
      <RoundButton
        size="XL"
        status="default"
        iconName="link-variant"
        onPress={this.handleShare}
      />
    );
  }
}
ShareGameButton.propTypes = {
  gameUUID: PropTypes.string.isRequired,
};

export default ShareGameButton;
