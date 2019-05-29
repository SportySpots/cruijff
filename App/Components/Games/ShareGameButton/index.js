import React from 'react';
import PropTypes from 'prop-types';
import { Share } from 'react-native';
import firebase from 'react-native-firebase';
import I18n from '../../../I18n';
import RoundButton from '../../Common/RoundButton';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ShareGameButton extends React.PureComponent {
  handleShare = () => {
    const { shareLink } = this.props;

    firebase.analytics().logEvent('share_btn_press');

    const title = 'SportySpots';
    const message = `${I18n.t('shareGameButton.msg')} ${shareLink}`;

    const content = { title, message, url: shareLink };
    const options = { dialogTitle: I18n.t('shareGameButton.dialogTitle'), subject: title };

    Share.share(content, options)
      .then((res) => {
        console.log(res);
        firebase.analytics().logEvent('share_btn_success');
      })
      .catch((err) => {
        console.log(err);
        firebase.analytics().logEvent('share_btn_failed');
      });
  }

  render() {
    return (
      <RoundButton
        size="XL"
        status="default"
        iconSet="MaterialCommunityIcons"
        iconName="link-variant"
        onPress={this.handleShare}
      />
    );
  }
}
ShareGameButton.propTypes = {
  // gameUUID: PropTypes.string.isRequired,
  shareLink: PropTypes.string.isRequired,
};

export default ShareGameButton;
