import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Block from '../Block';
import DurationPickerField from '.';

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
      fullWidth,
      size,
    } = this.props;
    const { value } = this.state;

    return (
      <View>
        <DurationPickerField
          theme={theme}
          label={label}
          fullWidth={fullWidth}
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
  fullWidth: PropTypes.bool,
};

Container.defaultProps = {
  theme: 'black',
  size: 'M',
  label: '',
  fullWidth: false,
};

storiesOf('Common.DurationPickerField', module)
  .add('DurationPickerField', () => <Container />)
  .add('DurationPickerField white theme', () => (
    <Block bgColor="primaryGreen">
      <Container theme="white" />
    </Block>
  ))
  .add('DurationPickerField fullWidth size ML', () => (
    <Container label="I'm the label" fullWidth size="ML" />
  ));
