import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components';
import Text from '../Text';
import Icon from '../Icon';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Button = styled(TouchableOpacity)`
  flex: ${({ main }) => (main ? 10 : 9)};
  height: ${({ main }) => (main ? 56 : 48)};
  border-top-width: ${({ main }) => (main ? 0 : StyleSheet.hairlineWidth)};
  border-top-color: ${({ theme, main }) => (main ? theme.colors.transparent : theme.colors.silver)};
  background-color: ${({ theme, main }) => (main ? theme.colors.primaryGreen : theme.colors.white)};
  border-top-left-radius: ${({ main }) => (main ? 8 : 0)};
  border-top-right-radius: ${({ main }) => (main ? 8 : 0)};
`;
//------------------------------------------------------------------------------
const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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
  ...otherProps
}) => {
  const baseColor = active ? 'primaryGreen' : 'black34';
  const color = main ? 'white' : baseColor;

  return (
    <Button
      main={main}
      onPress={onPress}
      {...otherProps}
    >
      <Center>
        <Icon
          iconSet={icon.set}
          iconName={icon.name}
          size={main ? 32 : 24}
          color={color}
        />
        <Text
          size="S"
          color={color}
        >
          {btnLabel}
        </Text>
      </Center>
    </Button>
  );
};

NavBarButton.propTypes = {
  btnLabel: PropTypes.string,
  icon: PropTypes.shape({
    set: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  active: PropTypes.bool,
  main: PropTypes.bool,
  onPress: PropTypes.func,
};

NavBarButton.defaultProps = {
  btnLabel: '',
  active: false,
  main: false,
  onPress: () => {},
};

export default NavBarButton;
