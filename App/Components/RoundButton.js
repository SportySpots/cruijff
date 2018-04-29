import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

const size = 50

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${size};
  width: ${size};
  border-radius: 50;
  border-width: 1;
  border-color: #ddd;
  shadow-color: #000;
  shadow-offset: {width: 2, height: 4};
  shadow-opacity: 0.4;
`

const RoundButton = ({ children, bgColor, onPress, ...rest }) => (
  <TouchableOpacity onPress={onPress} {...rest}>
    <Container style={{ backgroundColor: bgColor }}>{children}</Container>
  </TouchableOpacity>
)

RoundButton.propTypes = {
  children: PropTypes.any.isRequired,
  bgColor: PropTypes.string,
  onPress: PropTypes.func
}

RoundButton.defaultProps = {
  bgColor: 'white',
  onPress: () => {}
}

export default RoundButton
