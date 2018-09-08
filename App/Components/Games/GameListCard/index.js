import React from 'react';
import { propType } from 'graphql-anywhere';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import moment from 'moment';
import gameFragment from '../../../GraphQL/Games/Fragments/game';
import Colors from '../../../Themes/Colors';
import Fonts from '../../../Themes/Fonts';
import I18n from '../../../I18n';
import Text from '../../Common/Text';
import DotSpacer from '../../Common/DotSpacer';
import Spacer from '../../Common/Spacer';
import Row from '../../Common/Row';
import BackgroundImage from '../../Spots/BackgroundImage';
import Organizer from '../Organizer';
import Attendees from '../Attendees';
import GameCanceledFlag from '../GameCanceledFlag';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Outer = styled.View`
  display: flex;
  height: ${({ height }) => (height)};
  border-radius: 8px;
  shadow-offset: 1px 1px;
  shadow-color: ${Colors.shade};
  shadow-opacity: 0.8;
  elevation: 2;
  margin-vertical: 4px;
  margin-horizontal: 4px;
`;
//------------------------------------------------------------------------------
const Top = styled.View`
  height: 58px;
  padding-horizontal: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const Bottom = styled.View`
  flex: 1;
  display: flex;
  background-color: green;
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
const Overflow = styled.View`
  height: 30px;
  overflow: hidden;
  /* Hack to limit the height of the container and avoid the overflow */
  border: 0px solid white;
`;
//------------------------------------------------------------------------------
const SmallText = styled(Text.SM)`
  color: ${Colors.white};
`;
//------------------------------------------------------------------------------
const Title = styled(Text.M)`
  color: ${Colors.white};
  font-family: ${Fonts.type.emphasis};
  font-size: 22px;
`;
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
  const formattedStartTime = moment(startTime).format('D-MM HH:mm');

  return (
    <Outer height={isCanceled ? '270px' : '232px'}>
      <Top>
        <Organizer organizer={organizer} textSize="M" />
        <DotSpacer />
        <Text.M>
          {I18n.t(sport.category)}
        </Text.M>
      </Top>
      <Bottom>
        <BackgroundImage spot={spot} />
        {isCanceled && [
          <Spacer key="top-spacer" size="L" />,
          <GameCanceledFlag />,
        ]}
        <Container>
          <Overflow>
            <Title>{name}</Title>
          </Overflow>
          <Spacer size="M" />
          <Row>
            <IonIcon
              name="ios-time"
              color={Colors.white}
              size={24}
            />
            <Spacer direction="row" size="M" />
            <SmallText>
              {formattedStartTime}
            </SmallText>
            <Spacer direction="row" size="L" />
            <CommunityIcon
              name="map-marker"
              color={Colors.white}
              size={24}
            />
            <Spacer direction="row" size="M" />
            <SmallText>
              {spot.name}
            </SmallText>
          </Row>
          <Spacer size="L" />
          <Attendees game={game} />
        </Container>
      </Bottom>
    </Outer>
  );
};

GameListCard.propTypes = {
  game: propType(gameFragment).isRequired,
};

export default GameListCard;
