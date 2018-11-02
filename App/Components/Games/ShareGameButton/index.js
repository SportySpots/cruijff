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

    const title = 'SportySpots';
    const message = I18n.t('You have been invited to a SportySpots game:');
    const url = `https://${config.deeplinkHost}/games/${gameUUID}`;
    // const message = `${I18n.t('You have been invited to a SportySpots game:')} ${url}`;

    const content = { title, message, url };
    const options = { dialogTitle: I18n.t('share'), subject: title };

    Share.share(content, options)
      .then((res) => { console.log(res); })
      .catch((err) => { console.log(err); });
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
