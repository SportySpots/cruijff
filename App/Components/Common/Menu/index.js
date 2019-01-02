import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  Menu as MenuNative,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
import Text from '../Text';
import HeaderBtn from '../HeaderBtn';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledText = styled(Text.M)`
  color: ${({ danger }) => (danger ? Colors.red : Colors.black)};
`;
//------------------------------------------------------------------------------
// See: https://github.com/instea/react-native-popup-menu/blob/master/examples/StylingExample.js
const optionsStyles = {
  optionsContainer: {
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 6,
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
const Menu = ({
  menuName,
  triggerName,
  options,
  testID,
}) => (
  <MenuNative name={menuName}>
    <MenuTrigger menuName={triggerName}>
      <View pointerEvents="none" testID={testID}>
        <HeaderBtn iconName="more-vert" />
      </View>
    </MenuTrigger>
    <MenuOptions customStyles={optionsStyles}>
      {options.map(({
        id,
        text,
        danger,
        onPress,
      }) => (
        <MenuOption key={id} onSelect={onPress}>
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
  testID: PropTypes.string,
};

Menu.defaultProps = {
  options: [],
  testID: '',
};

export default Menu;
