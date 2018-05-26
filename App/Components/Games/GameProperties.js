import React, { Component } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import Text from '../Text'
import Colors from '../../Themes/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons';

const GameProperties = ({ game }) => (
    <GamePropertyContainer>
      <TitleContainer>
        <GameTitle>Straatvoetbal LEBO</GameTitle>
      </TitleContainer>
      <GamePropertyRow>
        <Icon name="event" size={24} color={Colors.gray} />
        <GamePropertyLabel>12-06-2018</GamePropertyLabel>
    </GamePropertyRow>
    <GamePropertyRow>
        <Icon name="watch-later" size={24} color={Colors.gray} />
        <GamePropertyLabel>16:00 - 18:00h</GamePropertyLabel>
    </GamePropertyRow>
    <GamePropertyRow>
        <Icon name="label" size={24} color={Colors.gray} />
        <GamePropertyLabel>Straatvoetbal</GamePropertyLabel>
    </GamePropertyRow>
    </GamePropertyContainer>
)

export default GameProperties

const TitleContainer = styled.View`
  display: flex;
  height: 56px;
  padding: 8px;
`

const GameTitle = styled(Text.L)`
  flex: 1;
  font-weight: 400;
  color: ${props => props.textColor || '#000'};
  padding-horizontal: 16px;
`

const GamePropertyContainer = styled.View`
  display: flex;
  flex-direction: column;
`

const GamePropertyRow = styled.View`
  display: flex;
  flex-direction: row;
  height: 40px;
  padding-horizontal: 20px;
`
const GamePropertyLabel = styled(Text.M)`
  flex: 1;
  font-weight: 400;
  color: ${props => props.textColor || '#000'};
  padding-horizontal: 20px;
`
