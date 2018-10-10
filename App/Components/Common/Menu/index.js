import React from 'react';
import PropTypes from 'prop-types';
import { Menu as MenuNative, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledText = styled(Text.M)`
  color: ${({ danger }) => (danger ? Colors.red : Colors.black)};
`;
//------------------------------------------------------------------------------
const TriggerContainer = styled.View`
  padding-right: 8px;
`;
//------------------------------------------------------------------------------
// See: https://github.com/instea/react-native-popup-menu/blob/master/examples/StylingExample.js
const optionsStyles = {
  optionsContainer: {
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: -34,
    marginLeft: -16,
  },
  optionWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Menu = ({ menuName, triggerName, options }) => (
  <MenuNative name={menuName}>
    <MenuTrigger menuName={triggerName}>
      <TriggerContainer>
        <Icon size={32} name="more-vert" />
      </TriggerContainer>
    </MenuTrigger>
    <MenuOptions customStyles={optionsStyles}>
      {options.map(({ id, text, danger, handlePress }) => (
        <MenuOption key={id} onSelect={handlePress}>
          <StyledText danger={danger}>
            {text}
          </StyledText>
        </MenuOption>
      ))}
    </MenuOptions>
  </MenuNative>
);

Menu.propTypes = {
  menuName: PropTypes.string.isRequired,
  triggerName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      danger: PropTypes.bool,
      onPress: PropTypes.func.isRequired,
    }),
  ),
};

Menu.defaultProps = {
  options: [],
};

export default Menu;
