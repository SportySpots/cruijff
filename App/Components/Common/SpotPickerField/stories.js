import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import Block from '../Block';
import SpotPickerFiled from './index';

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
        <Block>
          <StyledView>
            <SpotPickerFiled
              value={data.spot}
            />
          </StyledView>
        </Block>
      ))}
  </Query>
);

Container.propTypes = {
  active: PropTypes.bool,
};

Container.defaultProps = {
  active: false,
};

storiesOf('Spots.SpotPickerField', module)
  .add('SpotPickerField default', () => (
    <Container />
  ));
