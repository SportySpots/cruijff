import React from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import I18n from '../../../I18n';
// import Rating from '../../Common/Rating';
import Text from '../../Common/Text';
import Block from '../../Common/Block';
// import DotSpacer from '../../Common/DotSpacer';

//------------------------------------------------------------------------------
const Flex = styled.View`
  display: flex;
  justify-content: space-between;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotListCardSmallBody = ({ spot }) => {
  const sports = spot.sports.map(({ category }) => (
    I18n.t(category)
  )).join(', ');

  return (
    <Block>
      <Flex>
        <Text.ML>{spot.name}</Text.ML>
        <Text.M>{sports}</Text.M>
        {/*
          <Spacer orientation="column" size="M" />
          <Row>
            <Rating rating={spot.rating || 4} />
            <DotSpacer />
            <Text.S>{distance.toFixed(1)} km</Text.S>
          </Row>
        */}
      </Flex>
    </Block>
  );
};

SpotListCardSmallBody.propTypes = {
  spot: propType(spotFragment).isRequired,
};

export default SpotListCardSmallBody;
