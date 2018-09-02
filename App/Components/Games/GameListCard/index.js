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
import Organizer from '../Organizer';
import Attendees from '../Attendees';
import { HorizontalView } from '../style';
import getImageUrl from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const OuterContainer = styled.View`
  display: flex;
  height: 232px;
  border-radius: 8px;
  shadow-offset: 1px 1px;
  shadow-color: ${Colors.shade};
  shadow-opacity: 0.8;
  elevation: 2;
  margin-vertical: 4px;
  margin-horizontal: 4px;
`;
//------------------------------------------------------------------------------
const InnerContainer = styled.View`
  display: flex;
  height: 232px;
  border-radius: 8px;
  overflow: hidden;
`;
//------------------------------------------------------------------------------
const Top = styled.View`
  padding-horizontal: 16px;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const Bottom = styled.View`
  flex: 3;
  display: flex;
  background-color: green;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-horizontal: 16px;
  margin-vertical: 16px;
`;
//------------------------------------------------------------------------------
const ImageContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const Img = styled.Image`
  flex: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const ImgOverlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: .5;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
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
  const { spot } = game;
  const image = spot.images.length > 0
    ? getImageUrl(spot.images[0].image)
    : 'https://raw.githubusercontent.com/SportySpots/cruijff/master/App/Images/game-placeholder.png';

  const formattedStartTime = moment(game.start_time).format('D-MM HH:mm');

  return (
    <OuterContainer>
      <InnerContainer>
        <Top>
          <Organizer organizer={game.organizer} textSize="M" />
          <DotSpacer />
          <Text.M>
            {I18n.t(game.sport.category)}
          </Text.M>
        </Top>
        <Bottom>
          <ImageContainer>
            <Img source={{ uri: image }} />
            <ImgOverlay />
          </ImageContainer>
          <BottomContainer>
            <Title>{game.name}</Title>
            <Spacer size="M" />
            <HorizontalView>
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
            </HorizontalView>
            <Spacer size="L" />
            <Attendees game={game} />
          </BottomContainer>
        </Bottom>
      </InnerContainer>
    </OuterContainer>
  );
};

GameListCard.propTypes = {
  game: propType(gameFragment).isRequired,
};

export default GameListCard;
