import React from 'react';
import PropTypes from 'prop-types';
import { withUser, userPropTypes } from '../../../Context/User';
import I18n from '../../../I18n';
import Menu from '../../Common/Menu';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class UserMenu extends React.PureComponent {
  handleLogout = () => {
    const { logout, navigation } = this.props;
    navigation.navigate('SplashScreen');
    logout(); // don't need to await here
  }

  handleEdit = () => {
    const { navigation } = this.props;
    navigation.navigate('ProfileEditScreen');
  }

  render() {
    const { user } = this.props;

    if (!user || !user.uuid) {
      return null;
    }

    const OPTIONS = [
      {
        id: 'edit',
        text: I18n.t('userMenu.edit'),
        onPress: this.handleEdit,
      },
      {
        id: 'logout',
        text: I18n.t('userMenu.logout'),
        danger: true,
        onPress: this.handleLogout,
      },
    ];

    return (
      <Menu
        menuName="user-profile-menu"
        triggerName="user-profile-trigger"
        options={OPTIONS}
      />
    );
  }
}

UserMenu.propTypes = {
  user: userPropTypes.user,
  logout: userPropTypes.logout.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

UserMenu.defaultProps = {
  user: null,
};

export default withUser(UserMenu);
