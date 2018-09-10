import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../../Themes/Colors';
import { WithApolloMockProvider } from '../../../GraphQL';
import Block from '../../Common/Block';
import SportDateTimeForm from './index';

class Container extends React.PureComponent {
  state = {
    sport: null,
    date: null,
    time: null,
  }

  handleChange = ({ fieldName, value }) => {
    this.setState({ [fieldName]: value });
  }

  render() {
    const { theme } = this.props;
    const { sport, date, time } = this.state;

    return (
      <SportDateTimeForm
        theme={theme}
        sport={sport}
        date={date}
        time={time}
        onChange={this.handleChange}
      />
    );
  }
}

Container.propTypes = {
  theme: PropTypes.oneOf(['black', 'white']),
};

Container.defaultProps = {
  theme: 'black',
};

storiesOf('PlanGame.SportDateTimeForm', module)
  .add('SportDateTimeForm', () => (
    <WithApolloMockProvider>
      <Container />
    </WithApolloMockProvider>
  ))
  .add('SportDateTimeForm white theme', () => (
    <WithApolloMockProvider>
      <Block bgColor={Colors.primaryGreen}>
        <Container theme="white" />
      </Block>
    </WithApolloMockProvider>
  ));
