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
  background-color: ${({ theme }) => theme.colors.white};
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
// const Title = styled(Text.S)`
//   color: ${Colors.dusk}
// `;
// //------------------------------------------------------------------------------
// const Bold = styled(Text.SSM)`
//   font-weight: 500;
//   line-height: 18px;
// `;
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
          <Text size="S" color="dusk">
            Update
          </Text>
          <DotSpacer row size="M" />
          <Text size="S" color="dusk">
            1 hour ago
          </Text>
        </Row>
        <Spacer size="S" />
        <Row alignItems="center">
          <Text size="SSM" semibold>
            Sezayi
          </Text>
          <Spacer row size="S" />
          <Text size="SSM">
            attended
          </Text>
          <Spacer row size="S" />
          <Text size="SSM" semibold>
            Soccer Rocker
          </Text>
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
