import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import I18n from '../../../I18n';
import userActions from '../../../Redux/UserRedux';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import Menu from '../../Common/Menu';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class UserAdmin extends React.PureComponent {
  handleLogout = () => {
    const { logout, navigation } = this.props;
    // TODO: reset store
    logout();
    navigation.navigate('SplashScreen');
  }

  handleEdit = () => {
    const { navigation } = this.props;
    navigation.navigate('ProfileEditScreen');
  }

  render() {
    const { user } = this.props;

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

UserAdmin.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

// Redux integration
const dispatchToProps = { logout: userActions.logout };
const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps, dispatchToProps);

export default withRedux(UserAdmin);
