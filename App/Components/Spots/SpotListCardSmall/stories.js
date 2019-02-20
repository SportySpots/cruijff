import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import colors from '../../../Themes/Colors';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import Block from '../../Common/Block';
import SpotListCardSmall from '.';

const StyledView = styled.View`
  height: 80px;
`;

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { spotId: 455 },
  },
};

const Container = ({ active }) => (
  <Query
    query={GET_SPOT_DETAILS}
    variables={{ uuid: dummyNavigator.state.params.spotId }}
  >
    {({ loading, error, data }) =>
      (loading || error ? null : (
        <Block bgColor={colors.silver}>
          <StyledView>
            <SpotListCardSmall
              spot={data.spot}
              active={active}
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

storiesOf('Spots.SpotListCardSmall', module)
  .add('SpotListCardSmall default', () => (
    <Container />
  ))
  .add('SpotListCardSmall active', () => (
    <Container active />
  ));
