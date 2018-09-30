import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import DurationPickerField from './index';

class Container extends React.PureComponent {
  state = { value: null }

  handleChange = (value) => {
    this.setState(
      { value },
      () => { console.log(this.state); },
    );
  }

  render() {
    const { theme } = this.props;
    const { value } = this.state;

    return (
      <View>
        <Text>{value}</Text>
        <DurationPickerField
          theme={theme}
          value={value}
          onChange={this.handleChange}
        />
      </View>
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
  .add('DurationPickerField', () => <Container />)
  .add('DurationPickerField white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <Container theme="white" />
    </Block>
  ));
