import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import Text from '../../Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Danger = styled(Text.M)`
  color: ${Colors.red};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const EditMenu = ({ onEdit, onLogout }) => (
  <Menu name="popup">
    <MenuTrigger menuName="popup">
      <Icon size={32} name="more-vert" />
    </MenuTrigger>
    <MenuOptions>
      <MenuOption onSelect={onEdit}>
        <Text.M>{I18n.t('Edit')}</Text.M>
      </MenuOption>
      <MenuOption disabled />
      <MenuOption onSelect={onLogout}>
        <Danger>{I18n.t('Log out')}</Danger>
      </MenuOption>
    </MenuOptions>
  </Menu>
);

EditMenu.propTypes = {
  onEdit: PropTypes.func,
  onLogout: PropTypes.func,
};

EditMenu.defaultProps = {
  onEdit: () => {},
  onLogout: () => {},
};

export default EditMenu;
