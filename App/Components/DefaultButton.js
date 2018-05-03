import React from 'react'
import Text from './Text'
import { TouchableOpacity, View } from 'react-native'
import Colors from '../Themes/Colors'
import styled from 'styled-components/native'

const DefaultButton = ({ bgColor, textColor, text, disabled, ...props }) => {
  const RootComponent = disabled ? View : TouchableOpacity
  return (
    <RootComponent {...props}>
      <ButtonContainer bgColor={bgColor}>
        <ButtonLabel textColor={textColor}>{text}</ButtonLabel>
      </ButtonContainer>
    </RootComponent>
  )
}

export default DefaultButton

const ButtonContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgColor || Colors.actionYellow};
  margin: 16px;
  height: 56px;
  border-radius: 4px;
`

const ButtonLabel = styled(Text.M)`
  font-weight: 500;
  color: ${props => props.textColor || '#fff'};
`
