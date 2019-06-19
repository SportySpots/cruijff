import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Block from '../Block';
import LocationPickerField from '.';

class Container extends React.PureComponent {
  state = { value: null }

  handleChange = (location) => {
    this.setState(
      { value: location },
      // () => { console.log(this.state); },
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
        <LocationPickerField
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

storiesOf('Common.LocationPickerField', module)
  .add('LocationPickerField', () => <Container />)
  .add('LocationPickerField white theme', () => (
    <Block bgColor="primaryGreen">
      <Container theme="white" />
    </Block>
  ))
  .add('LocationPickerField fullWidth size ML', () => (
    <Container label="I'm the label" fullWidth size="ML" />
  ));
