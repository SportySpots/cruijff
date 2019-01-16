import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import Colors from '../../../Themes/Colors';
import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
import Block from '../../Common/Block';
import navigation from './mocks';
import SpotSlide from '.';

storiesOf('PlanGame.SpotSlide', module)
  .add('SpotSlide white theme', () => (
    <Query
      query={GET_SPORTS}
      variables={{ uuid: navigation.state.params.uuid }}
    >
      {({ loading, error, data }) =>
        (loading || error ? null : (
          <Block bgColor={Colors.silver}>
            <SpotSlide
              sport={data.sports[0]}
              onChange={this.handleChange}
            />
          </Block>
        ))
      }
    </Query>
  ));
