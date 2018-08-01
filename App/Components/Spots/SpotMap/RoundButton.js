import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50;
  border-width: 1;
  border-color: #ddd;
  shadow-color: #000;
  shadow-offset: {width: 2, height: 4};
  shadow-opacity: 0.4;
`;

const RoundButton = ({
  children, size, bgColor, onPress, ...rest
}) => (
  <TouchableOpacity onPress={onPress} {...rest}>
    <Container
      style={{
        height: size,
        width: size,
        backgroundColor: bgColor,
      }}
    >
      {children}
    </Container>
  </TouchableOpacity>
);

RoundButton.propTypes = {
  children: PropTypes.any.isRequired,
  size: PropTypes.number,
  bgColor: PropTypes.string,
  onPress: PropTypes.func,
};

RoundButton.defaultProps = {
  size: 50,
  bgColor: Colors.white,
  onPress: () => {},
};

export default RoundButton;
