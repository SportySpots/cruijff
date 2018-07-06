import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Keyboard } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import api from '../../../Services/SeedorfApi';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import Text from '../../../Components/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Danger = styled(Text.M)`
  color: ${Colors.red};
`;
//------------------------------------------------------------------------------
const TriggerContainer = styled.View`
  padding-right: 8px;
`;
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

    Keyboard.dismiss();
    // TODO: clear stack, then go to plan game page
    navigation.navigate('sportTime', { uuid: this.gameUUID });
  }

  handleCancel = async () => {
    const { navigation } = this.props;

    try {
      const result = await api.setGameStatus({ gameUUID: this.gameUUID, status: 'Canceled' });
      console.log(result);

      // After successful cancel, take user to...
      if (result.ok) {
        navigation.goBack(null);
      }
    } catch (exc) {
      console.log(exc);
    }
  }

  confirmCancel = () => {
    Keyboard.dismiss();

    Alert.alert(
      I18n.t('Confirm'),
      I18n.t('Are you sure you want to cancel this game?'),
      [
        { text: I18n.t('No'), onPress: () => null, style: 'cancel' },
        { text: I18n.t('Yes'), onPress: this.handleCancel },
      ],
    );
  }

  render() {
    // TODO: only display menu if user is organizer
    return (
      <Menu name="game-admin">
        <MenuTrigger menuName="game-admin">
          <TriggerContainer>
            <Icon size={32} name="more-vert" />
          </TriggerContainer>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={this.handleEdit}>
            <Text.M>{I18n.t('Edit')}</Text.M>
          </MenuOption>
          <MenuOption disabled />
          <MenuOption onSelect={this.confirmCancel}>
            <Danger>{I18n.t('Cancel')}</Danger>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  }
}

AdminMenu.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AdminMenu;
