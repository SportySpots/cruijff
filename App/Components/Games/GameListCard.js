import React from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import Config from 'react-native-config/index';
import moment from 'moment';

import Colors from '../../Themes/Colors';
import Text from '../Text';
import UserCircle from '../UserCircle';
import I18n from '../../I18n';
import Fonts from '../../Themes/Fonts';
import PropertyCircle from '../PropertyCircle';
import CappedList from '../CappedList';

class GameListCard extends React.Component {
  getImageUrl = (image) => {
    if (image.startsWith('http')) {
      return image;
    }
    return Config.SEEDORF_HOST + image;
  }

  render() {
    const game = this.props.game;
    const spot = game.spot;
    const image = spot.images.length > 0
      ? this.getImageUrl(spot.images[0].image)
      : 'https://raw.githubusercontent.com/SportySpots/cruijff/master/App/Images/game-placeholder.png';
    const attendingUsers = game.attendees
      ? game.attendees
        .filter(rsvp => rsvp.status === 'ATTENDING')
        .map(rsvp => rsvp.user)
      : [];

    const formattedStartTime = moment(game.start_time).format('D-MM HH:mm');

    return (
      <OuterContainer>
        <InnerContainer>
          <Top>
            <UserCircle user={game.organizer} />
            <TopText>
              <Text.M>{game.organizer.first_name} {game.organizer.last_name}</Text.M>
              <Spacer />
              <Text.M>{I18n.t(game.sport.category)}</Text.M>
            </TopText>
          </Top>
          <Bottom>
            <ImageContainer>
              <Img source={{ uri: image }} />
              <ImgOverlay />
            </ImageContainer>
            <BottomContainer>
              <Title>{game.name}</Title>
              <HorizontalView>
                <IonIcon style={{ marginRight: 8, backgroundColor: 'transparent' }} name="ios-time" color={Colors.white} size={24} />
                <SmallText style={{ marginRight: 16 }}>{formattedStartTime}</SmallText>
                <CommunityIcon style={{ marginRight: 8, backgroundColor: 'transparent'}} name="map-marker" color={Colors.white} size={24} />
                <SmallText>{spot.name}</SmallText>
              </HorizontalView>
              { attendingUsers.length > 0 && (
                <Attendees>
                  <HorizontalView>
                    <CappedList
                      max={7}
                      data={attendingUsers}
                      keyExtractor={user => user.uuid}
                      component={user => <UserCircle user={user} style={{ marginRight: 8 }} />}
                      capComponent={({ data }) => <PropertyCircle text={`+${data.length}`} />}
                    />
                  </HorizontalView>
                </Attendees>
              ) }
            </BottomContainer>
          </Bottom>
        </InnerContainer>
      </OuterContainer>
    );
  }
}

GameListCard.propTypes = {
  game: PropTypes.object,
};

export default GameListCard;

const Spacer = () => (
  <SpacerContainer>
    <Text.M style={{color: Colors.shade}}>·</Text.M>
  </SpacerContainer>
);

const SpacerContainer = styled.View`
  margin-horizontal: 8px;
`;

const TopText = styled.View`
  margin-left: 16px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const HorizontalView = styled.View`
  flex-direction: row;
  align-items: center;
`;

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


const InnerContainer = styled.View`
  display: flex;
  height: 232px;
  border-radius: 8px;
  overflow: hidden;
`;

const Top = styled.View`
  padding-horizontal: 16px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const Bottom = styled.View`
  flex: 3;
  display: flex;
  background-color: green;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-horizontal: 16px;
  margin-vertical: 16px;
`;

const ImageContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const Img = styled.Image`
  flex: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

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

const SmallText = styled(Text.SM)`
  color: ${Colors.white};
`;

const Title = styled(Text.M)`
  color: ${Colors.white};
  font-family: ${Fonts.type.emphasis};
  font-size: 22px;
  margin-bottom: 8px;
`;

const Attendees = styled.View`
  padding-top: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const NoUsersSpacer = styled.View`
  height: 50px;
`;
