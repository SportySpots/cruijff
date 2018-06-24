import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components';
import Text from '../../Text';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Button = styled(TouchableOpacity)`
  flex: ${props => (props.main ? 11 : 9)};
  height: ${props => (props.main ? 56 : 48)};
  border-top-width: ${props => (props.main ? 0 : StyleSheet.hairlineWidth)};
  border-top-color: ${props => (props.main ? Colors.transparent : Colors.lightGray)};
  background-color: ${props => (props.main ? Colors.primaryGreen : Colors.white)};
  border-top-left-radius: ${props => (props.main ? 8 : 0)};
  border-top-right-radius: ${props => (props.main ? 8 : 0)};
`;
//------------------------------------------------------------------------------
const Center = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
//------------------------------------------------------------------------------
const Label = styled(Text.S)`
  color: ${props => (props.color ? props.color : Colors.white)};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NavBarButton = ({
  btnLabel,
  main,
  icon,
  active,
  onPress,
}) => {
  const Icon = icon.set;
  const baseColor = active ? Colors.primaryGreen : Colors.black54;
  const color = main ? Colors.white : baseColor;

  return (
    <Button main={main} onPress={onPress}>
      <Center>
        <Icon
          name={icon.name}
          size={24}
          color={color}
        />
        <Label color={color}>
          {btnLabel}
        </Label>
      </Center>
    </Button>
  );
};

NavBarButton.propTypes = {
  btnLabel: PropTypes.string,
  icon: PropTypes.shape({
    set: PropTypes.any,
    name: PropTypes.string,
  }),
  active: PropTypes.bool,
  main: PropTypes.bool,
  onPress: PropTypes.func,
};

NavBarButton.defaultProps = {
  btnLabel: '',
  icon: PropTypes.shape({
    set: PropTypes.any,
    name: PropTypes.string,
  }),
  active: false,
  main: false,
  onPress: () => {},
};

export default NavBarButton;
