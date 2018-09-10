import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { WithApolloMockProvider } from '../../../GraphQL';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import SportPickerField from './index';

class Container extends React.PureComponent {
  state = { value: null }

  handleChange = (sport) => {
    this.setState({ value: sport.name });
  }

  render() {
    const { theme } = this.props;
    const { value } = this.state;

    return (
      <SportPickerField
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

storiesOf('Common.SportPickerField', module)
  .add('SportPickerField', () => (
    <WithApolloMockProvider>
      <Container />
    </WithApolloMockProvider>
  ))
  .add('SportPickerField white theme', () => (
    <WithApolloMockProvider>
      <Block bgColor={Colors.primaryGreen}>
        <Container theme="white" />
      </Block>
    </WithApolloMockProvider>
  ));
