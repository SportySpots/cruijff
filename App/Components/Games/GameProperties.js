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
      <Icon name="event" size={22} color={Colors.shade} />
      <GamePropertyLabel>{moment(game.start_time).format('DD-MM-YYYY')}</GamePropertyLabel>
    </GamePropertyRow>
    <GamePropertyRow>
      <Icon name="watch-later" size={22} color={Colors.shade} />
      <GamePropertyLabel>{moment(game.start_time).format('HH:mm')} - {moment(game.end_time).format('HH:mm')}</GamePropertyLabel>
    </GamePropertyRow>
    <GamePropertyRow>
      <Icon name="label" size={22} color={Colors.shade} />
      <GamePropertyLabel>{I18n.t(game.sport.category)}</GamePropertyLabel>
    </GamePropertyRow>
  </GamePropertyContainer>
);

export default GameProperties;

const TitleContainer = styled.View`
  display: flex;
  margin-bottom: 16px;
`;

const GameTitle = styled(Text.M)`
  font-size: 22px;
  color: ${props => props.textColor || '#000'};
`;

const GamePropertyContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const GamePropertyRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-vertical: 4px;
`;
const GamePropertyLabel = styled(Text.M)`
  flex: 1;
  font-size: 15px;
  color: ${props => props.textColor || '#000'};
  padding-horizontal: 20px;
`;
