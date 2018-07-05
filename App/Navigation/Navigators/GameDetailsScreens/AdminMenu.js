import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
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
const AdminMenu = ({ onEdit, onDelete }) => (
  <Menu name="game-admin">
    <MenuTrigger menuName="game-admin">
      <TriggerContainer>
        <Icon size={32} name="more-vert" />
      </TriggerContainer>
    </MenuTrigger>
    <MenuOptions>
      <MenuOption onSelect={onEdit}>
        <Text.M>{I18n.t('Edit')}</Text.M>
      </MenuOption>
      <MenuOption disabled />
      <MenuOption onSelect={onDelete}>
        <Danger>{I18n.t('Delete')}</Danger>
      </MenuOption>
    </MenuOptions>
  </Menu>
);

AdminMenu.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

AdminMenu.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};

export default AdminMenu;
