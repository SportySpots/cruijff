import React from 'react';
import { propType } from 'graphql-anywhere';
import { View } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Themes/Colors';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Row from '../../Common/Row';
import Block from '../../Common/Block';
import Spacer from '../../Common/Spacer';
import DotSpacer from '../../Common/DotSpacer';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const CARD_HEIGHT = 72;
const IMG_WIDTH = 75;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const RowContainer = styled(Row)`
  height: ${CARD_HEIGHT}px;
`;
//------------------------------------------------------------------------------
const Left = styled(Block)`
  flex: 1;
  border: 1px solid red;
`;
//------------------------------------------------------------------------------
const Right = styled.View`
  height: ${CARD_HEIGHT}px;
  width: ${IMG_WIDTH}px;
  border: 1px solid red;
`;
//------------------------------------------------------------------------------
const Bold = styled(Text.SSM)`
  font-weight: bold;
  line-height: 16px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotificationCard = () => (
  <RowContainer>
    <Left midHeight>
      <Row alignItems="center">
        <Icon
          name="message-alert"
          size={18}
          color={Colors.link}
        />
        <Spacer row size="M" />
        <Text.S>Update</Text.S>
        <DotSpacer row size="M" />
        <Text.S>1 hour ago</Text.S>
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
    <Right></Right>
  </RowContainer>
);

NotificationCard.propTypes = {
  // spot: propType(spotFragment).isRequired,
};

export default NotificationCard;
