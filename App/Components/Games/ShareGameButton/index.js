import React from 'react';
import PropTypes from 'prop-types';
import { Linking, Share } from 'react-native';
import firebase from 'react-native-firebase';
import I18n from '../../../I18n';
import RoundButton from '../../Common/RoundButton';

const iconStyle = {
  facebook: {
    iconSet: 'FontAwesome',
    iconName: 'facebook',
    color: 'facebook',
  },
  whatsapp: {
    iconSet: 'FontAwesome',
    iconName: 'whatsapp',
    color: 'whatsapp',
  },
  email: {
    iconSet: 'FontAwesome',
    iconName: 'envelope',
    color: 'grassDark',
  },
  native: {
    iconSet: 'FontAwesome',
    iconName: 'link',
    color: 'notify',
  },
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ShareGameButton extends React.PureComponent {
  handlePress = () => {
    const { variant, shareLink } = this.props;
    const title = 'SportySpots';
    const message = `${I18n.t('shareGameButton.msg')} ${shareLink}`;

    if (variant === 'native') {
      return this.handleNativeShare({ title, message });
    }
    let url = shareLink;
    if (variant === 'facebook') url = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&t=${title}`;
    else if (variant === 'whatsapp') url = `https://wa.me/?text=${message}`;
    else if (variant === 'email') url = `mailto:?subject=${title}&body=${message}`;
    else return null;

    return Linking.openURL(url).catch(() => null);
  }

  handleNativeShare = ({ title, message }) => {
    const { shareLink } = this.props;

    firebase.analytics().logEvent('share_btn_press');

    const content = { title, message, url: shareLink };
    const options = { dialogTitle: I18n.t('shareGameButton.dialogTitle'), subject: title };

    return Share.share(content, options)
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
    const { variant } = this.props;
    const style = iconStyle[variant];
    return (
      <RoundButton
        size="XL"
        status="default"
        iconSet={style.iconSet}
        iconName={style.iconName}
        bgColor={style.color}
        onPress={this.handlePress}
      />
    );
  }
}
ShareGameButton.propTypes = {
  // gameUUID: PropTypes.string.isRequired,
  shareLink: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    'whatsapp',
    'facebook',
    'email',
    'native',
  ]).isRequired,
};

export default ShareGameButton;
