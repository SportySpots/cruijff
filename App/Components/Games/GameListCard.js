import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import I18n from '../../I18n';
import Colors from '../../Themes/Colors';
import Text from '../Text';

const HorizontalView = styled.View`
  flex-direction: row;
`;

const Container = styled(HorizontalView)`
  height: 100px;
`;

const Left = styled.View`
  flex: 1;
  padding-left: 8px;
`;

const Right = styled.View`
  flex: 5;
`;
const SpotImage = styled.Image`
  height: 100px;
  width: 100%;
  border-radius: 8px;
`;

const SpotImageContainer = styled.View`
  border-radius: 8px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Overlay = styled.View`
  justify-content: space-between;
  flex: 1;
`;

const Top = styled.View`
  padding-left: 8px;
  height: 25px;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(Text.M)`
  color: ${Colors.white};
  margin-left: 8px;
`;

const WhiteSM = styled(Text.SM)`
  color: ${Colors.white};
`;

const OrangeSM = styled(Text.SM)`
  color: ${Colors.actionYellow};
`;

const Bottom = styled.View`
  height: 35px;
  padding-left: 8px;
  background-color: ${Colors.greenSemi};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  flex-direction: row;
  align-items: center;
`;

const GameListCard = ({ game }) => {
  const { spot } = game;

  return (
    <Container>
      <Left>
        <Text.L>{moment.utc(game.start_time).format('D')}</Text.L>
        <Text.M>{moment.utc(game.end_time).format('MMM')}</Text.M>
      </Left>
      <Right>
        <SpotImageContainer>
          <SpotImage
            source={{
              uri:
                spot.images && spot.images.length > 0
                  ? spot.images[0].image
                  : 'https://raw.githubusercontent.com/SportySpots/cruijff/graphql/App/Images/spot-placeholder.png',
            }}
          />
        </SpotImageContainer>
        <Overlay>
          <Top>
            <MaterialIcon color={Colors.white} name="flag" />
            <Title>{game.spot.name}</Title>
          </Top>
          <Bottom>
            <WhiteSM>
              {moment.utc(game.start_time).format('H:mm')}&nbsp;-&nbsp;
              {moment.utc(game.end_time).format('H:mm')} · {I18n.t(game.sport.category)}
            </WhiteSM>
            {game.capacity && game.capacity > 0 && [
              <WhiteSM key="dot">
                ·&nbsp;
              </WhiteSM>,
              <OrangeSM key="capacity">
                {game.capacity} {I18n.t('people')}
              </OrangeSM>,
            ]}
          </Bottom>
        </Overlay>
      </Right>
    </Container>
  );
};

GameListCard.propTypes = {
  game: PropTypes.object,
  // style: ViewPropTypes.style,
};

export default GameListCard;
