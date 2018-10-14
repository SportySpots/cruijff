import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import Colors from '../../../Themes/Colors';
import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
import Block from '../../Common/Block';
import SpotForm from './index';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 455 },
  },
};

storiesOf('PlanGame.SpotForm', module)
  .add('SpotForm white theme', () => (
    <Query
      query={GET_SPORTS}
      variables={{ uuid: dummyNavigator.state.params.uuid }}
    >
      {({ loading, error, data }) =>
        (loading || error ? null : (
          <Block bgColor={Colors.lightGray}>
            <SpotForm
              sport={data.sports[0]}
              onChange={this.handleChange}
            />
          </Block>
        ))
      }
    </Query>
  ));

/*
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Colors from '../../../Themes/Colors';
import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
import Block from '../../Common/Block';
import SpotForm from './index';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 455 },
  },
};

const Container = ({ theme }) => (
  <Query
    query={GET_SPORTS}
    variables={{ uuid: dummyNavigator.state.params.uuid }}
  >
    {({ loading, error, data }) =>
      (loading || error ? null : (
        <Block>
          <SpotForm
            theme={theme}
            sport={data.sports[0]}
            onChange={this.handleChange}
          />
        </Block>
      ))
    }
  </Query>
);

Container.propTypes = {
  theme: PropTypes.oneOf(['black', 'white']),
};

Container.defaultProps = {
  theme: 'black',
};

storiesOf('PlanGame.SpotForm', module)
  .add('SpotForm white theme', () => (
    <Block bgColor={Colors.lightGray}>
      <Container theme="white" />
    </Block>
  ));
*/
