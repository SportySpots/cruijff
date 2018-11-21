import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import I18n from '../../../I18n';
import Menu from '../../Common/Menu';
import GET_GAME_ORGANIZER from '../../../GraphQL/Games/Queries/GET_GAME_ORGANIZER';
import { withUser, userPropTypes } from '../../../Context/User';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class AdminMenu extends React.PureComponent {
  get gameUUID() {
    const { navigation } = this.props;
    return navigation.state.params.uuid;
  }

  handleEdit = () => {
    const { navigation } = this.props;
    navigation.navigate('EditGameScreen', { uuid: this.gameUUID });
  }

  handleCancel = () => {
    const { navigation } = this.props;
    navigation.navigate('CancelGameScreen', { uuid: this.gameUUID });
  }

  render() {
    const { user } = this.props;

    const OPTIONS = [
      {
        id: 'edit',
        text: I18n.t('Edit activity'),
        onPress: this.handleEdit,
      },
      {
        id: 'cancel',
        text: I18n.t('Cancel activity'),
        danger: true,
        onPress: this.handleCancel,
      },
    ];

    return (
      <Query
        query={GET_GAME_ORGANIZER}
        variables={{ uuid: this.gameUUID }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading || error || !data || !data.game || data.game.status === 'CANCELED') {
            return null;
          }

          // Only display menu if user is the organizer of the activity
          const isOrganizer = (
            user
            && user.uuid
            && data.game.organizer
            && data.game.organizer.uuid
            && user.uuid === data.game.organizer.uuid
          );

          if (!isOrganizer) {
            return null;
          }

          return (
            <Menu
              testID="gameAdminMenuTrigger"
              menuName="display-game-menu"
              triggerName="display-game-trigger"
              options={OPTIONS}
            />
          );
        }}
      </Query>
    );
  }
}

AdminMenu.propTypes = {
  user: userPropTypes.user,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired,
    popToTop: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

AdminMenu.defaultProps = {
  user: null,
};

export default withUser(AdminMenu);
