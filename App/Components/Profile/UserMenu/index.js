import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import I18n from '../../../I18n';
import { client } from '../../../GraphQL';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import Menu from '../../Common/Menu';
import { userPropTypes, withUser } from '../../../Context/User';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class UserMenu extends React.PureComponent {
  handleLogout = () => {
    const { logout, navigation } = this.props;
    logout();
    client.resetStore();
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
        text: I18n.t('Edit'),
        onPress: this.handleEdit,
      },
      {
        id: 'logout',
        text: I18n.t('Log out'),
        danger: true,
        onPress: this.handleLogout,
      },
    ];

    return (
      <Query
        query={GET_USER_DETAILS}
        variables={{ uuid: user.uuid }}
      >
        {({ loading, error, data }) => {
          if (loading || error || !data || !data.user) {
            return null;
          }

          return (
            <Menu
              menuName="user-profile-menu"
              triggerName="user-profile-trigger"
              options={OPTIONS}
            />
          );
        }}
      </Query>
    );
  }
}

UserMenu.propTypes = {
  user: userPropTypes.user.isRequired,
  logout: userPropTypes.logout.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withUser(UserMenu);
