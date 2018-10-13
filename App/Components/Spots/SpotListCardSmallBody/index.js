import React from 'react';
import { propType } from 'graphql-anywhere';
import { View } from 'react-native';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import I18n from '../../../I18n';
// import Rating from '../../Common/Rating';
import Text from '../../Common/Text';
import Row from '../../Common/Row';
import DotSpacer from '../../Common/DotSpacer';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotListCardSmallBody = ({ spot }) => (
  <View>
    <Text.ML>{spot.name}</Text.ML>
    <Row>
      {spot.sports.map(({ category }, index) => [
        <Text.SM key={category}>
          {I18n.t(category)}
        </Text.SM>,
        index !== spot.sports.length - 1 && (
          <DotSpacer key={`spacer-${category}`} />
        ),
      ])}
    </Row>
    {/*
      <Spacer orientation="column" size="M" />
      <Row>
        <Rating rating={spot.rating || 4} />
        <DotSpacer />
        <Text.S>{distance.toFixed(1)} km</Text.S>
      </Row>
    */}
  </View>
);

SpotListCardSmallBody.propTypes = {
  spot: propType(spotFragment).isRequired,
};

export default SpotListCardSmallBody;
