import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../Themes/Colors';
import Text from './Common/Text';

const SecondaryButton = ({
  borderColor, textColor, text, ...props
}) => (
  <TouchableOpacity {...props}>
    <ButtonContainer borderColor={borderColor}>
      <ButtonLabel textColor={textColor}>{text}</ButtonLabel>
    </ButtonContainer>
  </TouchableOpacity>
);

export default SecondaryButton;

const ButtonContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.borderColor || '#000'};
  margin: 16px;
  height: 56px;
  border-radius: 4px;
`;

const ButtonLabel = styled(Text.M)`
  font-weight: 500;
  color: ${props => props.textColor || '#000'};
`;
