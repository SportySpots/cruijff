import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../Themes/Colors';
import Text from './Common/Text';

const FlatButton = ({
  bgColor,
  textColor,
  text,
  ...props
}) => (
  <TouchableOpacity {...props}>
    <ButtonContainer bgColor={bgColor}>
      <ButtonLabel textColor={textColor}>{text}</ButtonLabel>
    </ButtonContainer>
  </TouchableOpacity>
);

FlatButton.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  text: PropTypes.string,
};

export default FlatButton;

const ButtonContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  padding-horizontal: 8px;
  margin: 8px;
  height: 32px;
  border-radius: 4px;
`;

const ButtonLabel = styled(Text.M)`
  font-weight: 500;
  color: ${props => props.textColor || Colors.actionYellow};
`;
