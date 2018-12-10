/* import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import colors from '../../../Themes/Colors';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import Block from '../../Common/Block';
import SpotAmenities from '.';

const StyledView = styled.View`
  height: 80px;
`;

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { spotId: 455 },
  },
};

const Container = () => (
  <Query
    query={GET_SPOT_DETAILS}
    variables={{ uuid: dummyNavigator.state.params.spotId }}
  >
    {({ loading, error, data }) =>
      (loading || error ? null : (
        <Block bgColor={colors.lightGray}>
          <StyledView>
            <SpotAmenities
              amenities={data.spot.amenities}
            />
          </StyledView>
        </Block>
      ))}
  </Query>
);


storiesOf('Spots.SpotAmenities', module)
  .add('SpotAmenities', () => (
    <Container />
  ));
*/