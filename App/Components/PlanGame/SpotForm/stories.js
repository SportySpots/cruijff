import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Colors from '../../../Themes/Colors';
import { WithApolloMockProvider } from '../../../GraphQL';
import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
import Block from '../../Common/Block';
import SpotForm from './index';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 455 },
  },
};

class Container extends React.PureComponent {
  state = {
    spot: null,
  }

  handleChange = (spot) => {
    this.setState({ spot });
  }

  render() {
    const { theme } = this.props;

    return (
      <WithApolloMockProvider>
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
      </WithApolloMockProvider>
    );
  }
}

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
