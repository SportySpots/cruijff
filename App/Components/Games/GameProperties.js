import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import moment from 'moment';
import Text from '../Text';
import Colors from '../../Themes/Colors';
import I18n from '../../I18n';

const GameProperties = ({ game }) => (
  <GamePropertyContainer>
    <TitleContainer>
      <GameTitle>{game.name}</GameTitle>
    </TitleContainer>
    <GamePropertyRow>
      <Icon name="event" size={24} color={Colors.gray} />
      <GamePropertyLabel>{moment(game.start_time).format('DD-MM-YYYY')}</GamePropertyLabel>
    </GamePropertyRow>
    <GamePropertyRow>
      <Icon name="watch-later" size={24} color={Colors.gray} />
      <GamePropertyLabel>{moment(game.start_time).format('HH:mm')} - {moment(game.end_time).format('HH:mm')}</GamePropertyLabel>
    </GamePropertyRow>
    <GamePropertyRow>
      <Icon name="label" size={24} color={Colors.gray} />
      <GamePropertyLabel>{I18n.t(game.sport.category)}</GamePropertyLabel>
    </GamePropertyRow>
  </GamePropertyContainer>
);

export default GameProperties;

const TitleContainer = styled.View`
  display: flex;
  padding: 8px;
`;

const GameTitle = styled(Text.L)`
  font-weight: 400;
  color: ${props => props.textColor || '#000'};
  padding-horizontal: 16px;
`;

const GamePropertyContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const GamePropertyRow = styled.View`
  display: flex;
  flex-direction: row;
  height: 40px;
  padding-horizontal: 20px;
`;
const GamePropertyLabel = styled(Text.M)`
  flex: 1;
  font-weight: 400;
  color: ${props => props.textColor || '#000'};
  padding-horizontal: 20px;
`;
