import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import client from '../../../GraphQL/ApolloClient';
import { withUser, userPropTypes } from '../../../Context/User';
import I18n from '../../../I18n';
import Menu from '../../Common/Menu';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class UserMenu extends React.PureComponent {
  handleLogout = async () => {
    const { navigation, refetchUser } = this.props;
    // Remove token from async storage and reset apollo store
    await AsyncStorage.removeItem('TOKEN');
    // OBS: we don't neet set token for ApolloClient or REST here,
    // this is being handled for us on ApolloClient.setContext
    client.resetStore();
    await refetchUser(); // TODO: remove this after GET_ME is implemented
    navigation.navigate('SplashScreen');
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
  refetchUser: userPropTypes.refetchUser.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

UserMenu.defaultProps = {
  user: null,
};

export default withUser(UserMenu);
