import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
import Block from '../Block';
import SportCard from '.';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 455 },
  },
};

const Container = ({ isSelected }) => (
  <Query
    query={GET_SPORTS}
    variables={{ uuid: dummyNavigator.state.params.uuid }}
  >
    {({ loading, error, data }) =>
      (loading || error ? null : (
        <Block>
          <SportCard
            sport={data.sports[0]}
            isSelected={isSelected}
          />
        </Block>
      ))
    }
  </Query>
);

Container.propTypes = {
  isSelected: PropTypes.bool,
};

Container.defaultProps = {
  isSelected: false,
};

storiesOf('Common.SportCard', module)
  .add('SportCard', () => <Container />)
  .add('SportCard isSelected', () => <Container isSelected />);
