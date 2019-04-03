import React from 'react';
import { propType } from 'graphql-anywhere';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import gameFragment from '../../../GraphQL/Games/Fragments/game';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n';
import Text from '../../Common/Text';
import DotSpacer from '../../Common/DotSpacer';
import Spacer from '../../Common/Spacer';
import Row from '../../Common/Row';
import Icon from '../../Common/Icon';
import Avatar from '../../Common/Avatar';
import BackgroundImage from '../../Spots/BackgroundImage';
import Organizer from '../Organizer';
import Attendees from '../Attendees';
import GameCanceledFlag from '../GameCanceledFlag';
import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const CARD_HEIGHT = 192;
const CARD_HEIGHT_CANCELED = 252;
const CARD_WIDTH = Dimensions.get('window').width; // aprox, we are not considering the padding from the parent container
const HEADER_HEIGHT = 58;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Outer = styled.View`
  height: ${({ height }) => height}px;
  border-radius: 8px;
  shadow-offset: 1px 1px;
  shadow-color: ${({ theme }) => theme.colors.shade};
  shadow-opacity: 0.8;
  elevation: 2;
`;
//------------------------------------------------------------------------------
const Top = styled(Row)`
  height: ${HEADER_HEIGHT}px;
  padding-horizontal: 16px;
  background-color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const Bottom = styled.View`
  flex: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 16px;
`;
//------------------------------------------------------------------------------
const iconStyle = { backgroundColor: Colors.transparent };
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameListCard = ({ game }) => {
  const {
    spot,
    start_time: startTime,
    status,
    organizer,
    sport,
    name,
  } = game;

  const isCanceled = status === 'CANCELED';
  const attendees = getAttendees(game.attendees);
  const formattedStartTime = moment.utc(startTime).local().format('D-MM HH:mm');
  const cardHeight = (isCanceled ? CARD_HEIGHT_CANCELED : CARD_HEIGHT) + Avatar.size('S') * (!!attendees && attendees.length > 0);

  return (
    <Outer height={cardHeight}>
      <Top alignItems="center">
        <Organizer organizer={organizer} textSize="M" />
        <DotSpacer />
        <Text size="M">
          {I18n.t(sport.category)}
        </Text>
      </Top>
      <Bottom>
        <BackgroundImage
          images={spot.images}
          height={cardHeight - HEADER_HEIGHT}
          width={CARD_WIDTH}
        />
        {isCanceled && [
          <Spacer key="spacer" size="L" />,
          <GameCanceledFlag key="cancel-flag" />,
        ]}
        <Container>
          <Text size="ML" color="white" numberOfLines={2}>
            {name}
          </Text>
          <Spacer size="M" />
          <Row>
            <Icon
              iconSet="Ionicons"
              iconName="ios-time"
              color="white"
              size={24}
              style={iconStyle}
            />
            <Spacer row size="M" />
            <Text size="SM" color="white">
              {formattedStartTime}
            </Text>
            <Spacer row size="L" />
            <Icon
              iconSet="MaterialCommunityIcons"
              iconName="map-marker"
              color="white"
              size={24}
              style={iconStyle}
            />
            <Spacer row size="M" />
            <Text size="SM" color="white">
              {spot.name}
            </Text>
          </Row>
          {attendees.length > 0 && [
            <Spacer key="spacer" size="L" />,
            <Attendees key="attendees" attendees={attendees} />,
          ]}
        </Container>
      </Bottom>
    </Outer>
  );
};

GameListCard.propTypes = {
  game: propType(gameFragment).isRequired,
};

export default GameListCard;
