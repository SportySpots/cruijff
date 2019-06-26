import React from 'react';
import PropTypes from 'prop-types';
import { Linking, Share } from 'react-native';
import firebase from 'react-native-firebase';
import I18n from '../../../I18n';
import RoundButton from '../../Common/RoundButton';


//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const iconStyle = {
  facebook: {
    iconSet: 'FontAwesome',
    iconName: 'facebook',
    status: 'facebook',
  },
  whatsapp: {
    iconSet: 'FontAwesome',
    iconName: 'whatsapp',
    status: 'whatsapp',
  },
  email: {
    iconSet: 'MaterialCommunityIcons',
    iconName: 'email-outline',
    status: 'email',
  },
  native: {
    iconSet: 'MaterialCommunityIcons',
    iconName: 'link-variant',
    status: 'default',
  },
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ShareGameButton extends React.PureComponent {
  handlePress = async () => {
    const { variant, shareLink } = this.props;

    const title = 'SportySpots';
    const message = `${I18n.t('shareGameButton.msg')} ${shareLink}`;

    if (variant === 'native') {
      this.handleNativeShare({ title, message });
      return;
    }

    let url = shareLink;
    if (variant === 'facebook') url = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&t=${title}`;
    else if (variant === 'whatsapp') url = `https://wa.me/?text=${message}`;
    else if (variant === 'email') url = `mailto:?subject=${title}&body=${message}`;

    try {
      await Linking.openURL(url);
    } catch (exc) {
      console.log(exc);
    }
  }

  handleNativeShare = async ({ title, message }) => {
    const { shareLink } = this.props;

    firebase.analytics().logEvent('share_btn_press');

    const content = { title, message, url: shareLink };
    const options = { dialogTitle: I18n.t('shareGameButton.dialogTitle'), subject: title };

    try {
      await Share.share(content, options);
      firebase.analytics().logEvent('share_btn_success');
    } catch (exc) {
      console.log(exc);
      firebase.analytics().logEvent('share_btn_failed');
    }
  }

  render() {
    const { variant } = this.props;
    const { iconSet, iconName, status } = iconStyle[variant];

    return (
      <RoundButton
        size="XL"
        status={status} // TODO: change name to 'variant'
        iconSet={iconSet}
        iconName={iconName}
        onPress={this.handlePress}
      />
    );
  }
}

ShareGameButton.propTypes = {
  shareLink: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    'whatsapp',
    'facebook',
    'email',
    'native',
  ]).isRequired,
};

export default ShareGameButton;
