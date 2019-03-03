import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Themes/Colors';
import { getSpotImages } from '../../../utils';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import DotSpacer from '../../Common/DotSpacer';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const CARD_HEIGHT = 80;
const IMG_WIDTH = 75;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const RowContainer = styled(Row)`
  height: ${CARD_HEIGHT}px;
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
const Left = styled.View`
  flex: 1;
  padding: 8px 8px 8px 0;
  overflow: hidden;
`;
//------------------------------------------------------------------------------
const Right = styled.View`
  height: ${CARD_HEIGHT}px;
  width: ${IMG_WIDTH}px;
`;
//------------------------------------------------------------------------------
const Title = styled(Text.S)`
  color: ${Colors.dusk}
`;
//------------------------------------------------------------------------------
const Bold = styled(Text.SSM)`
  font-weight: 500;
  line-height: 18px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotificationCard = ({ notification }) => {
  const { image } = notification;
  const imgs = getSpotImages({ images: [image], height: CARD_HEIGHT, width: IMG_WIDTH });

  return (
    <RowContainer>
      <Left>
        <Row alignItems="center">
          <Icon
            name="message-alert"
            size={18}
            color={Colors.link}
          />
          <Spacer row size="ML" />
          <Title>Update</Title>
          <DotSpacer row size="M" />
          <Title>1 hour ago</Title>
        </Row>
        <Spacer size="S" />
        <Row alignItems="center">
          <Bold>Sezayi</Bold>
          <Spacer row size="S" />
          <Text.SSM>attended</Text.SSM>
          <Spacer row size="S" />
          <Bold>Soccer Rocker</Bold>
        </Row>
      </Left>
      <Right>
        <Image
          source={{ uri: imgs[0] }}
          style={{
            height: CARD_HEIGHT,
            width: IMG_WIDTH,
          }}
        />
      </Right>
    </RowContainer>
  );
};

NotificationCard.propTypes = {
  notification: PropTypes.shape({
    image: PropTypes.string,
  }).isRequired,
};

export default NotificationCard;
