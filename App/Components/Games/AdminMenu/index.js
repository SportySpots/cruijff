import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Keyboard } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { Query } from 'react-apollo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
// import Colors from '../../../Themes/Colors';
import Text from '../../Common/Text';
import GET_GAME_ORGANIZER from '../../../GraphQL/Games/Queries/GET_GAME_ORGANIZER';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
/* const Danger = styled(Text.M)`
  color: ${Colors.red};
`; */
//------------------------------------------------------------------------------
const TriggerContainer = styled.View`
  padding-right: 8px;
`;
//------------------------------------------------------------------------------
// See: https://github.com/instea/react-native-popup-menu/blob/master/examples/StylingExample.js
const optionsStyles = {
  optionsContainer: {
    borderRadius: 8,
  },
  optionWrapper: {
    padding: 16,
  },
};
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
    navigation.navigate('PlanScreen', { uuid: this.gameUUID });
  }

  handleCancel = () => {
    const { navigation } = this.props;
    navigation.navigate('CancelGameScreen', { uuid: this.gameUUID });
  }

  render() {
    const { user } = this.props;

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
            user &&
            user.uuid &&
            data.game.organizer &&
            data.game.organizer.uuid &&
            user.uuid === data.game.organizer.uuid
          );

          if (!isOrganizer) {
            return null;
          }

          return (
            <Menu name="game-admin">
              <MenuTrigger menuName="game-admin">
                <TriggerContainer testID="gameAdminMenuTrigger">
                  <Icon size={32} name="more-vert" />
                </TriggerContainer>
              </MenuTrigger>
              <MenuOptions customStyles={optionsStyles}>
                {/* <MenuOption onSelect={this.handleEdit}>
                  <Text.M>{I18n.t('Edit Activity')}</Text.M>
                </MenuOption>
                <MenuOption disabled /> */}
                <MenuOption onSelect={this.handleCancel}>
                  <Text.M testID="gameAdminMenuCancel">{I18n.t('Cancel activity')}</Text.M>
                </MenuOption>
              </MenuOptions>
            </Menu>
          );
        }}
      </Query>
    );
  }
}

AdminMenu.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string,
  }),
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

const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps, null);

export default withRedux(AdminMenu);
