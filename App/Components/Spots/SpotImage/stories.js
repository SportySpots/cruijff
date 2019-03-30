import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import SpotImage from '.';

const Container = styled.View`
  height: 100px;
`;

const imgStyle = {
  flex: 1,
};

storiesOf('Spots.SpotImage', module)
  .add('SpotImage', () => (
    <Query
      query={GET_SPOT_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) => (
        loading || error ? null : (
          <Container>
            <SpotImage
              images={data.spot.images}
              style={imgStyle}
              height={200}
              width={300}
            />
          </Container>
        ))
      }
    </Query>
  ));
