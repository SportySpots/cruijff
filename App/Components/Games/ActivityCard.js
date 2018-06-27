import React from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import Colors from '../../Themes/Colors';
import Text from '../Text';
import UserCircle from '../UserCircle';
import I18n from '../../I18n';
import Config from 'react-native-config/index';
import { cardSmall } from '../Spots/Styles/CardStyles';
import { Image } from 'react-native';
import Fonts from '../../Themes/Fonts';
import PropertyCircle from '../PropertyCircle';

const mapMax = (maxNum, data, fn, fnElse) => {
  if (maxNum >= data.length) return data.map(fn);

  const returnArr = data.slice(0, maxNum - 1).map(fn);
  returnArr.push(fnElse());
  return returnArr;
};

class ActivityCard extends React.Component {
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


    return (
      <ActivityCardContainer>
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
              <IonIcon style={{ marginRight: 8 }} name="ios-time" color={Colors.white} size={24} />
              <SmallText style={{ marginRight: 16 }}>{game.start_time}</SmallText>
              <CommunityIcon style={{ marginRight: 8 }} name="map-marker" color={Colors.white} size={24} />
              <SmallText>{spot.name}</SmallText>
            </HorizontalView>
            <Attendees>
              <HorizontalView style={{ flex: 1 }}>
                {mapMax(
                  7,
                  attendingUsers,
                  user => <UserCircle key={user.uuid} user={user} style={{ marginRight: 8 }} />,
                  () => <PropertyCircle key="extra" text={`+${attendingUsers.length - 6}`} />,
                )}
              </HorizontalView>
            </Attendees>
          </BottomContainer>
        </Bottom>
      </ActivityCardContainer>
    );
  }
}

ActivityCard.propTypes = {
  game: PropTypes.object,
  // style: ViewPropTypes.style,
};

export default ActivityCard;

const Spacer = () => (
  <SpacerContainer>
    <Text.M>·</Text.M>
  </SpacerContainer>
);

const SpacerContainer = styled.View`
  margin-horizontal: 8px;
`;

const TopText = styled.View`
  margin-left: 16px;
  flex-direction: row;
`;

const HorizontalView = styled.View`
  flex-direction: row;
  align-items: center;
  
`;

const ActivityCardContainer = styled.View`
  display: flex;
  height: 232px;
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

const SmallText = styled(Text.S)`
  color: ${Colors.white};
`;

const Title = styled(Text.M)`
  color: ${Colors.white};
  font-family: ${Fonts.type.emphasis};
  font-size: 22px;
  margin-bottom: 8px;
`;

const Attendees = styled.View`
  flex: 1;
  padding-top: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const WhiteSM = styled(Text.SM)`
  color: ${Colors.white};
`;

const OrangeSM = styled(Text.SM)`
  color: ${Colors.actionYellow};
`;

