import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import DurationPickerField from './index';

class Container extends React.PureComponent {
  state = { value: '' }

  handleChange = ({ value }) => {
    this.setState(
      { value },
      () => { console.log(this.state); },
    );
  }

  render() {
    const {
      theme,
      label,
      boxed,
      size,
    } = this.props;
    const { value } = this.state;

    return (
      <View>
        <Text>{value}</Text>
        <DurationPickerField
          theme={theme}
          label={label}
          boxed={boxed}
          value={value}
          onChange={this.handleChange}
          size={size}
        />
      </View>
    );
  }
}

Container.propTypes = {
  theme: PropTypes.oneOf(['black', 'white']),
  size: PropTypes.string,
  label: PropTypes.string,
  boxed: PropTypes.bool,
};

Container.defaultProps = {
  theme: 'black',
  size: 'M',
  label: '',
  boxed: false,
};

storiesOf('Common.DurationPickerField', module)
  .add('DurationPickerField', () => <Container />)
  .add('DurationPickerField white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <Container theme="white" />
    </Block>
  ))
  .add('DurationPickerField boxed size ML', () => (
    <Container label="I'm the label" boxed size="ML" />
  ));
