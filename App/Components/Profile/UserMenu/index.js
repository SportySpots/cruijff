import React from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import client from '../../../GraphQL/ApolloClient';
import I18n from '../../../I18n';
import Menu from '../../Common/Menu';
import userStore from 'App/Stores/User';
import {observer} from "mobx-react";
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
@observer
class UserMenu extends React.PureComponent {
  handleLogout = async () => {
    const { navigation } = this.props;
    await userStore.logout();
    // OBS: we don't neet set token for ApolloClient or REST here,
    // this is being handled for us on ApolloClient.setContext
    client.resetStore();
    await userStore.fetchUser()
    navigation.navigate('SplashScreen');
  }

  handleEdit = () => {
    const { navigation } = this.props;
    navigation.navigate('ProfileEditScreen');
  }

  render() {
    const user = userStore.user;

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
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default UserMenu;
