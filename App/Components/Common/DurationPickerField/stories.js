import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { WithApolloMockProvider } from '../../../GraphQL';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import DurationPickerField from './index';

class Container extends React.PureComponent {
  state = { value: null }

  handleChange = (date) => {
    this.setState({ value: date });
  }

  render() {
    const { theme } = this.props;
    const { value } = this.state;

    return (
      <DurationPickerField
        theme={theme}
        value={value}
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

storiesOf('Common.DurationPickerField', module)
  .add('DurationPickerField', () => (
    <WithApolloMockProvider>
      <Container />
    </WithApolloMockProvider>
  ))
  .add('DurationPickerField white theme', () => (
    <WithApolloMockProvider>
      <Block bgColor={Colors.primaryGreen}>
        <Container theme="white" />
      </Block>
    </WithApolloMockProvider>
  ));
